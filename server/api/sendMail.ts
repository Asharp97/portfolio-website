export default defineEventHandler(async (event) => {
  const { sendMail } = useNodeMailer();
  const { email, name, msg } = await readBody(event);

  return await sendMail({
    to: process.env.MY_EMAIL,
    subject: `portofolio message from ${name}`,
    text: `Name: ${name}\nFROM: ${email}\nMESSAGE: ${msg}`,
  });
});
