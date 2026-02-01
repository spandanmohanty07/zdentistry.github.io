// Netlify Function to send WhatsApp notifications for form submissions
//
// Setup instructions:
// 1. Go to https://www.callmebot.com/blog/free-api-whatsapp-messages/
// 2. Add the CallMeBot number to your WhatsApp contacts: +34 644 71 81 99
// 3. Send "I allow callmebot to send me messages" to that number
// 4. You'll receive an API key
// 5. Add these environment variables in Netlify Dashboard > Site Settings > Environment Variables:
//    - WHATSAPP_PHONE: Your WhatsApp number (e.g., 918984489929)
//    - WHATSAPP_API_KEY: The API key from CallMeBot

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, phone, email, service, message } = JSON.parse(event.body);

    // Get environment variables
    const whatsappPhone = process.env.WHATSAPP_PHONE;
    const whatsappApiKey = process.env.WHATSAPP_API_KEY;

    // If WhatsApp is not configured, just return success
    if (!whatsappPhone || !whatsappApiKey) {
      console.log('WhatsApp notification skipped - not configured');
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'WhatsApp not configured - form still submitted successfully'
        })
      };
    }

    // Format the message
    const whatsappMessage = `🦷 *New Contact Form Submission*

*Name:* ${name || 'Not provided'}
*Phone:* ${phone || 'Not provided'}
*Email:* ${email || 'Not provided'}
*Service:* ${service || 'Not specified'}

*Message:*
${message || 'No message'}

---
_Sent from ZDentistry website_`;

    // URL encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Send via CallMeBot API
    const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${whatsappPhone}&text=${encodedMessage}&apikey=${whatsappApiKey}`;

    const response = await fetch(callMeBotUrl);

    if (response.ok) {
      console.log('WhatsApp notification sent successfully');
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'WhatsApp notification sent' })
      };
    } else {
      console.error('WhatsApp API error:', await response.text());
      return {
        statusCode: 200, // Still return 200 so form submission isn't affected
        body: JSON.stringify({ success: false, message: 'WhatsApp notification failed but form submitted' })
      };
    }

  } catch (error) {
    console.error('Error in notify-whatsapp function:', error);
    return {
      statusCode: 200, // Return 200 so form submission isn't affected
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
