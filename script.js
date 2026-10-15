const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const languageButton = document.querySelector('.language-toggle');
const photoViewer = document.querySelector('.photo-viewer');
const viewerImage = photoViewer.querySelector('img');
const viewerCaption = photoViewer.querySelector('figcaption');
let activePhoto = 0;

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Tap any portfolio image to open it large. Arrow keys and swipe buttons browse the set.
const photos = [...document.querySelectorAll('.work-card img')];
const captions = [...document.querySelectorAll('.work-caption b')];
function showPhoto(index) {
  activePhoto = (index + photos.length) % photos.length;
  viewerImage.src = photos[activePhoto].src;
  viewerImage.alt = photos[activePhoto].alt;
  viewerCaption.textContent = captions[activePhoto].textContent;
  photoViewer.querySelector('.viewer-count').textContent = `${String(activePhoto + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
}
photos.forEach((photo, index) => {
  photo.tabIndex = 0;
  photo.setAttribute('role', 'button');
  photo.setAttribute('aria-label', `Enlarge project photo ${index + 1}`);
  photo.addEventListener('click', () => { showPhoto(index); photoViewer.showModal(); });
  photo.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showPhoto(index); photoViewer.showModal(); }
  });
});
photoViewer.querySelector('.viewer-close').addEventListener('click', () => photoViewer.close());
photoViewer.querySelector('.viewer-prev').addEventListener('click', () => showPhoto(activePhoto - 1));
photoViewer.querySelector('.viewer-next').addEventListener('click', () => showPhoto(activePhoto + 1));
photoViewer.addEventListener('click', (event) => { if (event.target === photoViewer) photoViewer.close(); });
photoViewer.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') showPhoto(activePhoto + 1);
  if (event.key === 'ArrowLeft') showPhoto(activePhoto - 1);
});

// English/Hindi text pairs. Layout and project prices stay consistent between languages.
const translations = [
  ['.main-nav a:nth-child(1)', 'Our work', 'हमारा काम'], ['.main-nav a:nth-child(2)', 'Services', 'सेवाएँ'], ['.main-nav a:nth-child(3)', 'Pricing', 'कीमतें'], ['.main-nav a:nth-child(4)', 'About', 'हमारे बारे में'],
  ['.header-cta', 'Get a free estimate <span>↗</span>', 'मुफ़्त अनुमान पाएँ <span>↗</span>'],
  ['.hero-copy .eyebrow', '<span class="eyebrow-line"></span> YOUR LOCAL PAINTING CREW', '<span class="eyebrow-line"></span> आपकी स्थानीय पेंटिंग टीम'],
  ['.hero h1', 'A fresh coat.<br /><em>A whole new</em><br />feeling.', 'नया रंग।<br /><em>नया एहसास।</em>'],
  ['.hero-intro', 'Thoughtful painting, tidy work, and a finish you’ll love coming home to. We make refreshing your space feel refreshingly easy.', 'सलीके से पेंटिंग, साफ़-सुथरा काम और ऐसी फिनिश जिसे देखकर घर लौटना अच्छा लगे। घर को नया रूप देना अब आसान है।'],
  ['.hero-actions .button', 'Get a free estimate <span>↗</span>', 'मुफ़्त अनुमान पाएँ <span>↗</span>'], ['.hero-actions .text-link', 'See what we do <span>↓</span>', 'हमारा काम देखें <span>↓</span>'],
  ['.hero-proof strong', 'Good work travels.', 'अच्छे काम की पहचान दूर तक जाती है।'], ['.hero-proof small', 'Ask us about recent local projects', 'हमारे हाल के प्रोजेक्ट्स के बारे में पूछें'],
  ['.image-label b', 'ROOM TO BREATHE', 'खुला और सुकूनभरा कमरा'], ['.image-label small', 'Interior · Soft white', 'इंटीरियर · हल्का सफ़ेद'],
  ['.hero-bottom span:first-child', 'GOOD PEOPLE. GOOD PREP. GOOD PAINT.', 'अच्छे लोग। अच्छी तैयारी। शानदार रंग।'], ['.hero-bottom span:last-child', 'SCROLL TO EXPLORE&nbsp; ↓', 'आगे देखने के लिए स्क्रॉल करें&nbsp; ↓'],
  ['.trust-inner>span', 'THE LITTLE THINGS MATTER', 'छोटी बातें भी मायने रखती हैं'], ['.trust-inner div:nth-of-type(1)', '<b>01</b> Careful prep', '<b>01</b> पूरी तैयारी'], ['.trust-inner div:nth-of-type(2)', '<b>02</b> Clean, tidy crew', '<b>02</b> साफ़-सुथरी टीम'], ['.trust-inner div:nth-of-type(3)', '<b>03</b> Quality materials', '<b>03</b> अच्छी सामग्री'], ['.trust-inner div:nth-of-type(4)', '<b>04</b> No-surprise quotes', '<b>04</b> साफ़ और स्पष्ट अनुमान'],
  ['#work .eyebrow', '<span class="eyebrow-line"></span> A FEW RECENT FAVORITES', '<span class="eyebrow-line"></span> हाल के कुछ पसंदीदा काम'], ['#work h2', 'Good work.<br /><em>Good as new.</em>', 'बेहतरीन काम।<br /><em>बिल्कुल नया।</em>'], ['.section-heading>p', 'From one room that needs a little love to a full-home refresh, we bring the same care to every brushstroke.', 'एक कमरे से लेकर पूरे घर तक, हम हर ब्रशस्ट्रोक में वही सावधानी रखते हैं।'],
  ['.work-card:nth-child(1) .work-caption b', 'THE SUNLIT RESET', 'धूप से भरा नया रूप'], ['.work-card:nth-child(1) .work-caption small', 'Interior · Walls & trim', 'इंटीरियर · दीवारें और बॉर्डर'], ['.work-card:nth-child(2) .work-caption b', 'A SOFTER SHADE', 'हल्का और सुकूनभरा रंग'], ['.work-card:nth-child(2) .work-caption small', 'Whole-home repaint', 'पूरे घर की पेंटिंग'], ['.work-card:nth-child(3) .work-caption b', 'THE LITTLE DETAILS', 'छोटी-छोटी बारीकियाँ'], ['.work-card:nth-child(3) .work-caption small', 'Interior · Doors & trim', 'इंटीरियर · दरवाज़े और बॉर्डर'], ['.photo-note', 'Project photos shown are illustrative. Replace with your own finished projects.', 'यहाँ उदाहरण के लिए फ़ोटो दी गई हैं। इन्हें अपने प्रोजेक्ट की फ़ोटो से बदलें।'],
  ['.services-title .eyebrow', '<span class="eyebrow-line"></span> WHAT WE PAINT', '<span class="eyebrow-line"></span> हमारी पेंटिंग सेवाएँ'], ['.services-title h2', 'One crew.<br /><em>Every surface.</em>', 'एक टीम।<br /><em>हर सतह।</em>'], ['.services-title>p', 'Careful prep, dependable people, and a finish that holds up. Tell us what you have in mind.', 'पूरी तैयारी, भरोसेमंद लोग और टिकाऊ फिनिश। बताइए, आप क्या करवाना चाहते हैं।'], ['.services-title .text-link', 'Talk through your project <span>↗</span>', 'अपने प्रोजेक्ट पर बात करें <span>↗</span>'],
  ['.service-list article:nth-child(1) h3', 'Interior painting', 'इंटीरियर पेंटिंग'], ['.service-list article:nth-child(1) p', 'Walls, ceilings, trim, doors and all the details in between.', 'दीवारें, छत, बॉर्डर, दरवाज़े और बाकी बारीकियाँ।'], ['.service-list article:nth-child(2) h3', 'Exterior painting', 'एक्सटीरियर पेंटिंग'], ['.service-list article:nth-child(2) p', 'Weather-ready finishes for siding, shutters, fences and more.', 'दीवारों, शटर, बाड़ और अन्य बाहरी सतहों के लिए टिकाऊ फिनिश।'], ['.service-list article:nth-child(3) h3', 'Cabinets & built-ins', 'कैबिनेट और फिटिंग्स'], ['.service-list article:nth-child(3) p', 'A considered refresh for kitchens, vanities and custom shelves.', 'किचन, वैनिटी और कस्टम शेल्फ़ को नया रूप दें।'], ['.service-list article:nth-child(4) h3', 'Color & touch-ups', 'रंग और टच-अप'], ['.service-list article:nth-child(4) p', 'Need a second opinion or a small fix? We can help with that too.', 'रंग चुनने में मदद या छोटा-मोटा सुधार चाहिए? हम मदद करेंगे।'],
  ['.pricing-top .eyebrow', '<span class="eyebrow-line"></span> STRAIGHTFORWARD PRICING', '<span class="eyebrow-line"></span> आसान और स्पष्ट कीमतें'], ['.pricing-top h2', 'Know what to<br /><em>expect.</em>', 'पहले से जानें<br /><em>क्या उम्मीद करें।</em>'], ['.pricing-top>p', 'Every space is different, so these are starting points—not a surprise invoice. We’ll visit, listen, and give you a clear written estimate before work begins.', 'हर जगह अलग होती है। ये शुरुआती कीमतें हैं। काम शुरू करने से पहले हम जगह देखकर लिखित अनुमान देंगे।'],
  ['.price-card:nth-child(1) .price-type', 'A ROOM REFRESH', 'कमरे को नया रूप'], ['.price-card:nth-child(1) h3', 'Interior room', 'इंटीरियर कमरा'], ['.price-card:nth-child(1) .price-desc', 'Walls, standard prep and two coats.', 'दीवारें, सामान्य तैयारी और रंग के दो कोट।'], ['.price-card:nth-child(1) .price>span', 'from', 'से शुरू'], ['.price-card:nth-child(1) .price-foot', 'Typical 10 × 12 ft room', 'आमतौर पर 10 × 12 फ़ुट का कमरा'],
  ['.price-card:nth-child(2) .price-type', 'A FRESH FRONT', 'बाहरी हिस्से की नई रंगत'], ['.price-card:nth-child(2) h3', 'Exterior refresh', 'एक्सटीरियर रिफ्रेश'], ['.price-card:nth-child(2) .price-desc', 'Siding, trim and weather-ready finish.', 'बाहरी दीवारें, बॉर्डर और मौसम-सहने वाली फिनिश।'], ['.price-card:nth-child(2) .price>span', 'from', 'से शुरू'], ['.price-card:nth-child(2) .price-foot', 'Final price depends on home size', 'अंतिम कीमत घर के आकार पर निर्भर है'],
  ['.price-card:nth-child(3) .price-type', 'A DETAIL-LOVING RESET', 'बारीकियों के साथ नया रूप'], ['.price-card:nth-child(3) h3', 'Cabinet painting', 'कैबिनेट पेंटिंग'], ['.price-card:nth-child(3) .price-desc', 'Doors, frames and a smooth new finish.', 'दरवाज़े, फ्रेम और चिकनी नई फिनिश।'], ['.price-card:nth-child(3) .price>span', 'from', 'से शुरू'], ['.price-card:nth-child(3) .price-foot', 'Based on a standard-size kitchen', 'सामान्य आकार के किचन के लिए'],
  ['.pricing-note', 'Sample starting prices only. Update these to match your actual rates and service area before publishing. <a href="#contact">Ask for a free, no-pressure estimate ↗</a>', 'ये केवल उदाहरण कीमतें हैं। प्रकाशित करने से पहले अपनी दरें और सेवा क्षेत्र अपडेट करें। <a href="#contact">मुफ़्त अनुमान पूछें ↗</a>'],
  ['.about-copy .eyebrow', '<span class="eyebrow-line"></span> A LITTLE ABOUT US', '<span class="eyebrow-line"></span> हमारे बारे में'], ['.about-copy h2', 'Respect for your home.<br /><em>Pride in every finish.</em>', 'आपके घर का सम्मान।<br /><em>हर फिनिश पर गर्व।</em>'], ['.about-copy p:nth-of-type(1)', 'We’re a small local crew that believes a great paint job starts long before the first coat. We protect your floors, prep with care, and leave your space clean when the work is done.', 'हमारी स्थानीय टीम मानती है कि बेहतरीन पेंटिंग पहले कोट से बहुत पहले शुरू होती है। हम फ़र्श को ढकते हैं, सावधानी से तैयारी करते हैं और काम के बाद जगह साफ़ छोड़ते हैं।'], ['.about-copy p:nth-of-type(2)', 'Clear communication and a finish you’re happy to show off—that’s the whole idea.', 'साफ़ बातचीत और ऐसी फिनिश जिस पर आपको गर्व हो—बस यही हमारा तरीका है।'], ['.signature', 'Good people. Good paint. <span>✳</span>', 'अच्छे लोग। शानदार रंग। <span>✳</span>'],
  ['.contact-left .eyebrow', '<span class="eyebrow-line"></span> LET’S MAKE A PLAN', '<span class="eyebrow-line"></span> चलिए योजना बनाते हैं'], ['.contact-left h2', 'Ready for a<br /><em>fresh start?</em>', 'तैयार हैं<br /><em>नई शुरुआत के लिए?</em>'], ['.contact-left>p', 'Tell us a little about your project. We’ll get back to you to arrange a no-pressure estimate.', 'अपने प्रोजेक्ट के बारे में बताइए। हम बिना किसी दबाव के अनुमान के लिए आपसे संपर्क करेंगे।'], ['.contact-left .button', 'Email for an estimate <span>↗</span>', 'अनुमान के लिए ईमेल करें <span>↗</span>'],
  ['.contact-detail:nth-child(1)>span', 'GIVE US A CALL', 'हमें कॉल करें'], ['.contact-detail:nth-child(1) a', 'Add your phone number ↗', 'अपना फ़ोन नंबर जोड़ें ↗'], ['.contact-detail:nth-child(2)>span', 'SEND A NOTE', 'ईमेल भेजें'], ['.contact-detail:nth-child(3)>span', 'WHERE WE WORK', 'हमारा सेवा क्षेत्र'], ['.contact-detail:nth-child(3) p', 'Your town and nearby areas', 'आपका शहर और आसपास के इलाके'], ['.contact-detail:nth-child(4)>span', 'WHEN WE’RE AROUND', 'काम का समय'], ['.contact-detail:nth-child(4) p', 'Monday–Friday · 8am–5pm', 'सोमवार–शुक्रवार · सुबह 8–शाम 5'], ['.contact-edit-note', 'Before publishing, replace the sample phone, email, location, prices and project photos with your business details.', 'प्रकाशित करने से पहले फ़ोन, ईमेल, जगह, कीमतें और प्रोजेक्ट फ़ोटो अपनी जानकारी से बदलें।'], ['.site-footer>a:last-child', 'BACK TO TOP ↑', 'ऊपर जाएँ ↑']
];
let currentLanguage = 'hi';
const originalContent = translations.map(([, english]) => english);
function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = currentLanguage;
  document.body.classList.toggle('hindi', currentLanguage === 'hi');
  translations.forEach(([selector, , hindi], index) => {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = currentLanguage === 'hi' ? hindi : originalContent[index];
  });
  languageButton.textContent = currentLanguage === 'hi' ? 'English' : 'हिंदी';
  languageButton.setAttribute('aria-label', currentLanguage === 'hi' ? 'Switch to English' : 'हिंदी में देखें');
}
setLanguage(currentLanguage);
languageButton.addEventListener('click', () => {
  setLanguage(currentLanguage === 'en' ? 'hi' : 'en');
});

// Bring sections in gently as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.work-card, .service-list article, .price-card, .about-copy, .contact-left').forEach((element) => {
  element.classList.add('reveal');
  revealObserver.observe(element);
});
