const gembaQuestions = [
  // Process Observation
  { id: 1, category: "Process Observation", text: "Are standard operating procedures clearly visible and being followed?", text_de: "Sind Standardarbeitsanweisungen deutlich sichtbar und werden sie befolgt?", text_tr: "Standart çalışma prosedürleri net bir şekilde görülebiliyor ve uygulanıyor mu?" },
  { id: 2, category: "Process Observation", text: "Is the process flow logical and efficient?", text_de: "Ist der Prozessablauf logisch und effizient?", text_tr: "Proses akışı mantıklı ve verimli mi?" },
  { id: 3, category: "Process Observation", text: "Are there any visible bottlenecks or constraints in the process?", text_de: "Gibt es sichtbare Engpässe oder Einschränkungen im Prozess?", text_tr: "Proses içinde gözle görülür darboğazlar veya kısıtlamalar var mı?" },
  { id: 4, category: "Process Observation", text: "Is there evidence of waste (motion, waiting, overproduction, etc.)?", text_de: "Gibt es Anzeichen von Verschwendung (Bewegung, Warten, Überproduktion usw.)?", text_tr: "İsraf (hareket, bekleme, aşırı üretim vb.) belirtileri var mı?" },
  { id: 5, category: "Process Observation", text: "Are quality checks being performed at appropriate points?", text_de: "Werden Qualitätskontrollen an geeigneten Stellen durchgeführt?", text_tr: "Kalite kontrolleri uygun noktalarda yapılıyor mu?" },
  // People Engagement
  { id: 6, category: "People Engagement", text: "Are team members engaged and knowledgeable about their work?", text_de: "Sind Teammitglieder engagiert und kennen ihre Arbeit?", text_tr: "Ekip üyeleri işlerine bağlı ve bilgili mi?" },
  { id: 7, category: "People Engagement", text: "Do team members have the necessary tools and resources?", text_de: "Verfügen Teammitglieder über die notwendigen Werkzeuge und Ressourcen?", text_tr: "Ekip üyeleri gerekli araç ve kaynaklara sahip mi?" },
  { id: 8, category: "People Engagement", text: "Is there evidence of cross-training or skill development?", text_de: "Gibt es Anzeichen für bereichsübergreifende Schulungen oder Kompetenzentwicklung?", text_tr: "Çapraz eğitim veya beceri gelişimi belirtileri var mı?" },
  { id: 9, category: "People Engagement", text: "Are team members empowered to suggest improvements?", text_de: "Sind Teammitglieder befugt, Verbesserungsvorschläge zu machen?", text_tr: "Ekip üyeleri iyileştirme önerisinde bulunma yetkisine sahip mi?" },
  { id: 10, category: "People Engagement", text: "Is there effective communication between team members and leadership?", text_de: "Gibt es eine effektive Kommunikation zwischen Teammitgliedern und Führungskräften?", text_tr: "Ekip üyeleri ile yöneticiler arasında etkili iletişim var mı?" },
  // Visual Management
  { id: 11, category: "Visual Management", text: "Are key performance indicators visible and up-to-date?", text_de: "Sind Leistungskennzahlen sichtbar und aktuell?", text_tr: "Temel performans göstergeleri görünür ve güncel mi?" },
  { id: 12, category: "Visual Management", text: "Are visual controls (signs, markings, color coding) effective?", text_de: "Sind visuelle Kontrollen (Schilder, Markierungen, Farbcodierung) wirksam?", text_tr: "Görsel kontroller (işaretler, çizgiler, renk kodları) etkili mi?" },
  { id: 13, category: "Visual Management", text: "Is the status of work clearly visible to all team members?", text_de: "Ist der Status der Arbeit für alle Teammitglieder klar erkennbar?", text_tr: "İşin durumu tüm ekip üyeleri tarafından net bir şekilde görülebiliyor mu?" },
  { id: 14, category: "Visual Management", text: "Are abnormalities or deviations from standard easily identifiable?", text_de: "Sind Abweichungen vom Standard leicht erkennbar?", text_tr: "Standartlardan sapmalar kolayca fark edilebiliyor mu?" },
  { id: 15, category: "Visual Management", text: "Are visual management tools being used to drive improvement?", text_de: "Werden visuelle Managementtools zur Förderung von Verbesserungen eingesetzt?", text_tr: "İyileştirme için görsel yönetim araçları kullanılıyor mu?" },
  // Problem Solving
  { id: 16, category: "Problem Solving", text: "Is there a structured approach to problem identification and resolution?", text_de: "Gibt es einen strukturierten Ansatz zur Problemidentifizierung und -lösung?", text_tr: "Problemleri tanımlamak ve çözmek için yapılandırılmış bir yaklaşım var mı?" },
  { id: 17, category: "Problem Solving", text: "Are root causes of problems being identified and addressed?", text_de: "Werden Grundursachen von Problemen identifiziert und behoben?", text_tr: "Problemlerin kök nedenleri tanımlanıyor ve ele alınıyor mu?" },
  { id: 18, category: "Problem Solving", text: "Is there evidence of countermeasures being implemented and followed up?", text_de: "Gibt es Anzeichen für die Umsetzung und Nachverfolgung von Gegenmaßnahmen?", text_tr: "Karşı önlemlerin uygulandığı ve takip edildiğine dair kanıt var mı?" },
  { id: 19, category: "Problem Solving", text: "Are problem-solving tools (5 Whys, Fishbone, etc.) being utilized?", text_de: "Werden Problemlösungswerkzeuge (5 Warum, Fischgrätendiagramm usw.) eingesetzt?", text_tr: "Problem çözme araçları (5 Neden, Balık kılçığı vb.) kullanılıyor mu?" },
  { id: 20, category: "Problem Solving", text: "Is there a system for tracking and closing problem-solving actions?", text_de: "Gibt es ein System zur Verfolgung und Abschließung von Problemlösungsmaßnahmen?", text_tr: "Problem çözme faaliyetlerini izleme ve kapatma sistemi var mı?" },
  // Continuous Improvement
  { id: 21, category: "Continuous Improvement", text: "Is there evidence of recent improvements or kaizen activities?", text_de: "Gibt es Anzeichen für kürzlich durchgeführte Verbesserungen oder Kaizen-Aktivitäten?", text_tr: "Son zamanlarda yapılan iyileştirmeler veya kaizen faaliyetlerine dair kanıt var mı?" },
  { id: 22, category: "Continuous Improvement", text: "Are improvement ideas being collected and implemented?", text_de: "Werden Verbesserungsideen gesammelt und umgesetzt?", text_tr: "İyileştirme fikirleri toplanıp uygulanıyor mu?" },
  { id: 23, category: "Continuous Improvement", text: "Is there a process for sharing and standardizing best practices?", text_de: "Gibt es einen Prozess zum Teilen und Standardisieren bewährter Praktiken?", text_tr: "En iyi uygulamaları paylaşmak ve standartlaştırmak için bir süreç var mı?" },
  { id: 24, category: "Continuous Improvement", text: "Are improvement metrics tracked and visible?", text_de: "Werden Verbesserungsmetriken verfolgt und sichtbar gemacht?", text_tr: "İyileştirme metrikleri izleniyor ve görünür mü?" },
  { id: 25, category: "Continuous Improvement", text: "Is there a culture of continuous learning and improvement?", text_de: "Gibt es eine Kultur des kontinuierlichen Lernens und der Verbesserung?", text_tr: "Sürekli öğrenme ve gelişme kültürü var mı?" }
];
export {
  gembaQuestions as g
};
//# sourceMappingURL=eGetAqWN.js.map
