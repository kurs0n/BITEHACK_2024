USE icons;

CREATE TABLE IF NOT EXISTS icons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon_path VARCHAR(255) NOT NULL,
    description TEXT,
    tag VARCHAR(255)
);




CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Insert tags
INSERT INTO tags (name) VALUES ('whatsapp');
INSERT INTO tags (name) VALUES ('ios_system');
INSERT INTO tags (name) VALUES ('android_system');
INSERT INTO tags (name) VALUES ('messenger');
INSERT INTO tags (name) VALUES ('instagram');
INSERT INTO tags (name) VALUES ('facebook');
INSERT INTO tags (name) VALUES ('google_maps');

-- Insert icons with appropriate tags
INSERT INTO icons (icon_path, description, tag)
VALUES
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-add-attachment.jpeg',
     'Use this icon to add attachments like photos or documents to your messages. Perfect for sharing files with loved ones.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-addphoto.jpeg',
     'Tap this icon to add a photo from your gallery or take a new one to send in a conversation.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-back.jpeg',
     'Use this icon to go back to the previous screen. It helps you easily navigate WhatsApp.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-calls.jpeg',
     'Tap this icon to view your recent calls or make a new one. Stay connected with friends and family.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-camera.jpeg',
     'Use this icon to open the camera. Take a picture and send it instantly to a chat.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-chat-user.jpeg',
     'This icon represents a conversation with a specific contact. Tap it to open your chat.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-chats.jpeg',
     'Tap this icon to access your list of chats. Find all your conversations here.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-community.jpeg',
     'This icon represents the WhatsApp Community section, where you can connect with groups of people.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-contact.jpeg',
     'Use this icon to view or add a contact. It makes finding and messaging people easy.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-document.jpeg',
     'Tap this icon to send a document. Ideal for sharing important files.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-examplechat.jpeg',
     'This icon shows an example of how a chat looks. Use it to learn WhatsApp messaging.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-keyboard.jpeg',
     'This icon represents the keyboard. Use it to type your messages.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-location.jpeg',
     'Tap this icon to share your location. Let your family and friends know where you are.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-phone.jpeg',
     'This icon lets you make a phone call. Stay in touch with loved ones.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-plussign.jpeg',
     'Tap this icon to access additional features like creating a new chat.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-poll.jpeg',
     'Use this icon to create and share a poll in a chat or group conversation.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-record-your-voice.jpeg',
     'This icon allows you to record a voice message. Simply speak into your phone and send.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-settings.jpeg',
     'Tap this icon to adjust your WhatsApp settings like privacy or notifications.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-sticker.jpeg',
     'This icon lets you add stickers to your messages. Make your chats fun and expressive.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-take-photo.jpeg',
     'Use this icon to take a new photo and share it directly in a conversation.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-takephoto.jpeg',
     'This icon lets you snap a quick photo and send it instantly.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-threedots.jpeg',
     'Tap this icon to view more options like settings, creating groups, or logging out.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-updates.jpeg',
     'This icon represents status updates. Check what your contacts have shared.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-video.jpeg',
     'Tap this icon to send a video or make a video call.',
     'whatsapp');