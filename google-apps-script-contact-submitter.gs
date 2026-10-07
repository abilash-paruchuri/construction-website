function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const requestId = String(payload.requestId || '');
    const properties = PropertiesService.getScriptProperties();
    const statusKey = 'contact_status_' + requestId;
    properties.setProperty(statusKey, JSON.stringify({ status: 'processing' }));
    // FormApp requires the editor form ID (/forms/d/{id}/edit), not the
    // published responder ID (/forms/d/e/{id}/viewform).
    const googleFormId = '19a6m_S_VxLpnJwm6IzLHCet5hjV3N3w2A1WzS6MqdZI';
    const form = FormApp.openById(googleFormId);
    let formResponse = form.createResponse();

    // Send the website enquiry into the matching questions in the Google Form.
    formResponse = addTextAnswer_(form, formResponse, 'Name', payload.name || '');
    formResponse = addTextAnswer_(form, formResponse, 'Email', payload.email || '');
    formResponse = addTextAnswer_(form, formResponse, 'Address', payload.location || '');
    formResponse = addTextAnswer_(form, formResponse, 'Phone number', payload.phone || '');
    const comments = [
      payload.project_type ? `Project type: ${payload.project_type}` : '',
      payload.location ? `Project location: ${payload.location}` : '',
      payload.message ? `\n${payload.message}` : ''
    ].filter(Boolean).join('\n');
    formResponse = addTextAnswer_(form, formResponse, 'Comments', comments);
    formResponse.submit();

    const spreadsheetId = '1SwU0xjVPijmftOD9Tz-X9faoppFfdRuSms5uJzp0cBM';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetById(298141766);
    if (!sheet) {
      throw new Error('Could not find spreadsheet tab gid 298141766.');
    }

    const row = [
      new Date(),
      payload.name || '',
      payload.email || '',
      payload.phone || '',
      payload.project_type || payload.projectType || '',
      payload.location || '',
      payload.message || '',
      'fairfield.pendleton@gmail.com',
      payload.source || 'wishnu-site'
    ];

    sheet.appendRow(row);

    const recipient = 'fairfield.pendleton@gmail.com';
    const subject = `New enquiry from ${payload.name || 'Website Visitor'} - WishNu Construction`;
    const body = [
      'New enquiry received from the WishNu website.',
      '',
      `Name: ${payload.name || ''}`,
      `Email: ${payload.email || ''}`,
      `Phone: ${payload.phone || ''}`,
      `Project Type: ${payload.project_type || payload.projectType || ''}`,
      `Location: ${payload.location || ''}`,
      '',
      'Message:',
      payload.message || ''
    ].join('\n');

    const emailOptions = {
      to: recipient,
      subject,
      body
    };
    if (payload.email) emailOptions.replyTo = payload.email;
    MailApp.sendEmail(emailOptions);

    properties.setProperty(statusKey, JSON.stringify({ status: 'success' }));
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Saved and emailed successfully.' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    const failedPayload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (failedPayload.requestId) {
      PropertiesService.getScriptProperties().setProperty(
        'contact_status_' + failedPayload.requestId,
        JSON.stringify({ status: 'error', message: error && error.message ? error.message : 'Unknown error' })
      );
    }
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error && error.message ? error.message : 'Unknown error'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function addTextAnswer_(form, response, questionTitle, answer) {
  const item = form.getItems().find(function (candidate) {
    return candidate.getTitle().trim().toLowerCase() === questionTitle.toLowerCase();
  });
  if (!item) {
    throw new Error('Google Form question not found: ' + questionTitle);
  }

  let itemResponse;
  if (item.getType() === FormApp.ItemType.TEXT) {
    itemResponse = item.asTextItem().createResponse(String(answer));
  } else if (item.getType() === FormApp.ItemType.PARAGRAPH_TEXT) {
    itemResponse = item.asParagraphTextItem().createResponse(String(answer));
  } else {
    throw new Error('Unsupported Google Form question type for: ' + questionTitle);
  }
  return response.withItemResponse(itemResponse);
}

function doGet(e) {
  const requestId = String((e && e.parameter && e.parameter.requestId) || '');
  const callback = String((e && e.parameter && e.parameter.callback) || '');
  if (requestId && /^[\w-]{16,80}$/.test(requestId) && /^[A-Za-z_$][\w$]*$/.test(callback)) {
    const stored = PropertiesService.getScriptProperties().getProperty('contact_status_' + requestId);
    const result = stored ? JSON.parse(stored) : { status: 'pending' };
    return ContentService.createTextOutput(callback + '(' + JSON.stringify(result) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput('WishNu contact endpoint is active. Use POST to submit enquiries.');
}
