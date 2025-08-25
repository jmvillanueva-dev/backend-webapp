import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.HOST_MAILTRAP,
  port: process.env.PORT_MAILTRAP,
  auth: {
    user: process.env.USER_MAILTRAP,
    pass: process.env.PASS_MAILTRAP,
  },
});


const sendMailToRegister = (userMail, url) => {
  let mailOptions = {
    from: `${process.env.USER_MAILTRAP}`,
    to: userMail,
    subject: "Confirma tu correo electrónico - AppWeb",
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 28px 20px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 0.5px;">
                AppWeb
            </h1>
            <p style="margin: 8px 0 0 0; color: #e0f2fe; font-size: 16px;">
                Sistema de Gestión Integral
            </p>
        </div>

        <!-- Content -->
        <div style="padding: 35px 30px;">
            <h2 style="color: #1f2937; text-align: center; font-size: 24px; margin-bottom: 25px; font-weight: 600;">
                ¡Bienvenido a Nuestra Plataforma!
            </h2>

            <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
                Estamos encantados de tenerte con nosotros. Para comenzar a utilizar todas las funcionalidades de nuestro sistema, necesitas confirmar tu dirección de correo electrónico.
            </p>

            <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
                La verificación de tu email garantiza la seguridad de tu cuenta y te permite acceder a todas las características de nuestra plataforma.
            </p>

            <!-- Button -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="${url}" 
                   style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
                          color: white; 
                          padding: 16px 32px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          font-weight: 600; 
                          font-size: 16px; 
                          display: inline-block;
                          box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
                          transition: all 0.3s ease;">
                    Confirmar Mi Cuenta
                </a>
            </div>

            <!-- Alternative link -->
            <p style="font-size: 14px; color: #6b7280; text-align: center; margin: 25px 0 15px;">
                Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:
            </p>
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
                <p style="font-size: 13px; color: #4b5563; word-break: break-all; margin: 0; font-family: monospace;">
                    ${url}
                </p>
            </div>

            <!-- Security note -->
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 30px 0;">
                <p style="font-size: 14px; color: #92400e; margin: 0;">
                    🔒 <strong>Importante:</strong> Este enlace expirará en 24 horas por seguridad. 
                    Si no realizaste esta solicitud, ignora este mensaje.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 25px 30px; text-align: center;">
            <div style="margin-bottom: 15px;">
                <p style="color: #d1d5db; font-size: 14px; margin: 0 0 10px 0;">
                    Escuela de Formación de Tecnólogos - EPN
                </p>
                <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                    Examen Final de Carrera
                </p>
            </div>
            
            <div style="border-top: 1px solid #374151; padding-top: 20px;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0 0 10px 0;">
                    ¿Necesitas ayuda? Contáctanos: 
                    <a href="mailto:wiphala.studio@gmail.com" style="color: #60a5fa; text-decoration: none;">Soporte Técnico</a>
                </p>
                <p style="color: #6b7280; font-size: 11px; margin: 0;">
                    © ${new Date().getFullYear()} AppWeb. Todos los derechos reservados.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error enviando correo:", error);
    } else {
      console.log("Correo de confirmación enviado: ", info.messageId);
    }
  });
};

export { sendMailToRegister };

