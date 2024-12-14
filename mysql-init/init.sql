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
     'This icon represents the option to add attachments, like photos or files, in WhatsApp. Use it to share memories or important documents with family and friends.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-back.jpeg',
     'This icon helps you go back to the previous screen. Use it if you want to return to the main menu or undo an action.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-calls.jpeg',
     'This icon shows the call log in WhatsApp. Tap it to see who you recently talked to or to make a new call.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-camera.jpeg',
     'This icon opens the camera in WhatsApp. Use it to take a photo or video and send it directly to your contacts.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-chat-user.jpeg',
     'This icon represents a chat with a specific contact. Tap it to open your messages with that person.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-chats.jpeg',
     'This icon leads to your list of chats. Use it to find all your conversations in one place.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-community.jpeg',
     'This icon takes you to the community section in WhatsApp. It’s a space to join and interact with groups.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-examplechat.jpeg',
     'This icon shows an example chat interface. Use it to understand how your messages will look in a conversation.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-phone.jpeg',
     'This icon represents making a phone call. Tap it to call someone directly through WhatsApp.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-plussign.jpeg',
     'This icon adds new options. Tap it to start a new conversation or access additional features.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-record-your-voice.jpeg',
     'This icon allows you to record and send a voice message. Speak into your phone to send a quick voice note.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-settings.jpeg',
     'This icon opens the settings in WhatsApp. Use it to change your profile, privacy, or notification preferences.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-sticker.jpeg',
     'This icon represents stickers in WhatsApp. Tap it to add fun images to your conversations.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-take-photo.jpeg',
     'This icon opens the camera to take a photo. Use it to capture moments and share them instantly.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-threedots.jpeg',
     'This icon shows more options in WhatsApp. Tap it to access additional features or settings.',
     'whatsapp'),
    ('https://bitehack.s3.eu-north-1.amazonaws.com/whatsapp-updates.jpeg',
     'This icon represents updates in WhatsApp. Use it to view status updates shared by your contacts.',
     'whatsapp');