const { ImapFlow } = require("imapflow");

const main = async (client) => {
  otp = "";
  await client.connect();

  let lock = await client.getMailboxLock("INBOX");

  try {
    let message = await client.fetchOne(client.mailbox.exists, {
      source: true,
    });

    data = message.source.toString();
    index = data.search("Your OTP is [0-9]*.");
    if (index != -1) {
      for (let i = index + 12; i < index + 18; i++) {
        otp += data[i];
      }
    } else {
        otp = ''
    }
  } catch (e) {
    console.log("OTP getting error: ", e);
  } finally {
    lock.release();
  }

  await client.logout();
  return otp;
};

exports.getProperties = async (req, res, next) => {
  try {
    const { email, pass } = req.body;

    if(email.includes('@gmail.com')){
      host = "imap.gmail.com";
      port = 993;
    }
    else if(email.includes('@outlook.com')){
      host = 'outlook.office365.com'
      port = 993
    }
    else{
      return res.status(400).json({
        success: false,
        errorMessage: "Provide a valid email address",
        data: '',
      });
    }

    var client = new ImapFlow({
      host: host,
      port: port,
      secure: true,
      auth: {
        user: email,
        pass: pass,
      },
    });

    main(client)
      .catch((err) => {
        return res.status(400).json({
          success: false,
          errorMessage: "Error from imapflow. Can't connect email server",
          error: err,
          data: ''
        });
      })
      .then((otp) => {
        // console.log('Your OTP is', otp)
        if (otp) {
          return res.status(200).json({
            success: true,
            data: otp,
          });
        } else {
          return res.status(400).json({
            success: false,
            errorMessage: "OTP not found in recent email",
            data: otp,
          });
        }
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Internal server error, Invalid email",
      data: ''
    });
  }
};
