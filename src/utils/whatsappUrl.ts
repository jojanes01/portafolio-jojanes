const whatsappMessage = encodeURIComponent(
  `Hola, estoy interesado en saber más sobre los proyectos y servicios. ¡Espero tu respuesta!`
);

export const whatsappURL = `https://api.whatsapp.com/send?phone=573184471432&text=${whatsappMessage}`;
