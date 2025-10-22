interface HSEQuestion {
  id: number;
  category: 'Hazard Identification' | 'Risk Assessment' | 'Control Measures' | 'Emergency Preparedness' | 'Compliance';
  text: string;
  text_de?: string;
  text_tr?: string;
}

export const hseQuestions: HSEQuestion[] = [
  // Hazard Identification
  { id: 1, category: 'Hazard Identification', text: 'Are all work areas free from slip, trip, and fall hazards?', text_de: 'Sind alle Arbeitsbereiche frei von Rutsch-, Stolper- und Sturzgefahren?', text_tr: 'Tüm çalışma alanları kayma, takılma ve düşme tehlikelerinden arındırılmış mı?' },
  { id: 2, category: 'Hazard Identification', text: 'Are electrical hazards properly identified and marked?', text_de: 'Sind elektrische Gefahren ordnungsgemäß gekennzeichnet und markiert?', text_tr: 'Elektrik tehlikeleri uygun şekilde tanımlanmış ve işaretlenmiş mi?' },
  { id: 3, category: 'Hazard Identification', text: 'Are chemical hazards properly labeled and stored?', text_de: 'Sind chemische Gefahrstoffe ordnungsgemäß gekennzeichnet und gelagert?', text_tr: 'Kimyasal tehlikeler doğru şekilde etiketlenmiş ve depolanmış mı?' },
  { id: 4, category: 'Hazard Identification', text: 'Are mechanical hazards (pinch points, moving parts) properly guarded?', text_de: 'Sind mechanische Gefahren (Quetschstellen, bewegliche Teile) ordnungsgemäß gesichert?', text_tr: 'Mekanik tehlikeler (sıkışma noktaları, hareketli parçalar) uygun şekilde korunmuş mu?' },
  { id: 5, category: 'Hazard Identification', text: 'Are ergonomic hazards identified and addressed?', text_de: 'Werden ergonomische Gefahren erkannt und behoben?', text_tr: 'Ergonomik tehlikeler belirlenip ele alınmış mı?' },
  
  // Risk Assessment
  { id: 6, category: 'Risk Assessment', text: 'Are risk assessments conducted for all high-risk activities?', text_de: 'Werden Risikobewertungen für alle Aktivitäten mit hohem Risiko durchgeführt?', text_tr: 'Yüksek riskli tüm faaliyetler için risk değerlendirmesi yapılmış mı?' },
  { id: 7, category: 'Risk Assessment', text: 'Are risk assessment documents up-to-date and accessible?', text_de: 'Sind Risikobewertungsdokumente aktuell und zugänglich?', text_tr: 'Risk değerlendirme dokümanları güncel ve erişilebilir mi?' },
  { id: 8, category: 'Risk Assessment', text: 'Are employees involved in the risk assessment process?', text_de: 'Sind Mitarbeiter am Risikobewertungsprozess beteiligt?', text_tr: 'Çalışanlar risk değerlendirme sürecine dahil edilmiş mi?' },
  { id: 9, category: 'Risk Assessment', text: 'Is there a system for prioritizing risks based on severity and likelihood?', text_de: 'Gibt es ein System zur Priorisierung von Risiken nach Schweregrad und Wahrscheinlichkeit?', text_tr: 'Riskleri ciddiyet ve olasılığa göre önceliklendiren bir sistem var mı?' },
  { id: 10, category: 'Risk Assessment', text: 'Are near-miss incidents recorded and analyzed?', text_de: 'Werden Beinahe-Unfälle erfasst und analysiert?', text_tr: 'Ramak kala olaylar kaydedilip analiz ediliyor mu?' },
  
  // Control Measures
  { id: 11, category: 'Control Measures', text: 'Is appropriate PPE available and in good condition?', text_de: 'Ist geeignete PSA verfügbar und in gutem Zustand?', text_tr: 'Uygun KKD mevcut ve iyi durumda mı?' },
  { id: 12, category: 'Control Measures', text: 'Are engineering controls (guards, ventilation) functioning properly?', text_de: 'Funktionieren technische Schutzmaßnahmen (Schutzvorrichtungen, Belüftung) ordnungsgemäß?', text_tr: 'Mühendislik kontrolleri (koruyucular, havalandırma) düzgün çalışıyor mu?' },
  { id: 13, category: 'Control Measures', text: 'Are administrative controls (procedures, training) implemented effectively?', text_de: 'Werden administrative Kontrollen (Verfahren, Schulungen) wirksam umgesetzt?', text_tr: 'İdari kontroller (prosedürler, eğitimler) etkin şekilde uygulanıyor mu?' },
  { id: 14, category: 'Control Measures', text: 'Is there evidence of regular inspection of control measures?', text_de: 'Gibt es Anzeichen für regelmäßige Inspektion von Kontrollmaßnahmen?', text_tr: 'Kontrol önlemlerinin düzenli olarak denetlendiğine dair kanıt var mı?' },
  { id: 15, category: 'Control Measures', text: 'Are control measures regularly reviewed for effectiveness?', text_de: 'Werden Kontrollmaßnahmen regelmäßig auf ihre Wirksamkeit überprüft?', text_tr: 'Kontrol önlemleri düzenli olarak etkinlik açısından gözden geçiriliyor mu?' },
  
  // Emergency Preparedness
  { id: 16, category: 'Emergency Preparedness', text: 'Are emergency exits clearly marked and unobstructed?', text_de: 'Sind Notausgänge deutlich gekennzeichnet und nicht blockiert?', text_tr: 'Acil çıkışlar net şekilde işaretlenmiş ve engellenmemiş mi?' },
  { id: 17, category: 'Emergency Preparedness', text: 'Are fire extinguishers accessible and properly maintained?', text_de: 'Sind Feuerlöscher zugänglich und ordnungsgemäß gewartet?', text_tr: 'Yangın söndürücüler erişilebilir ve bakımlı mı?' },
  { id: 18, category: 'Emergency Preparedness', text: 'Are first aid kits fully stocked and easily accessible?', text_de: 'Sind Erste-Hilfe-Kästen vollständig bestückt und leicht zugänglich?', text_tr: 'İlk yardım çantaları eksiksiz ve kolay erişilebilir mi?' },
  { id: 19, category: 'Emergency Preparedness', text: 'Are emergency procedures clearly displayed and understood?', text_de: 'Sind Notfallverfahren deutlich sichtbar und werden sie verstanden?', text_tr: 'Acil durum prosedürleri net şekilde görüntülenmiş ve anlaşılmış mı?' },
  { id: 20, category: 'Emergency Preparedness', text: 'Have emergency drills been conducted and documented?', text_de: 'Wurden Notfallübungen durchgeführt und dokumentiert?', text_tr: 'Acil durum tatbikatları yapılmış ve belgelenmiş mi?' },
  
  // Compliance
  { id: 21, category: 'Compliance', text: 'Are all required safety permits and licenses current?', text_de: 'Sind alle erforderlichen Sicherheitsgenehmigungen und Lizenzen aktuell?', text_tr: 'Tüm gerekli güvenlik izinleri ve lisanslar güncel mi?' },
  { id: 22, category: 'Compliance', text: 'Are safety inspection records maintained and up-to-date?', text_de: 'Werden Sicherheitsinspektionsaufzeichnungen geführt und aktualisiert?', text_tr: 'Güvenlik denetim kayıtları tutuluyor ve güncel mi?' },
  { id: 23, category: 'Compliance', text: 'Is there evidence of regular safety training for all employees?', text_de: 'Gibt es Anzeichen für regelmäßige Sicherheitsschulungen für alle Mitarbeiter?', text_tr: 'Tüm çalışanlar için düzenli güvenlik eğitimi verildiğine dair kanıt var mı?' },
  { id: 24, category: 'Compliance', text: 'Are incident reports properly documented and investigated?', text_de: 'Werden Vorfallberichte ordnungsgemäß dokumentiert und untersucht?', text_tr: 'Olay raporları düzgün şekilde belgelenip araştırılıyor mu?' },
  { id: 25, category: 'Compliance', text: 'Is there a system for tracking and closing safety actions?', text_de: 'Gibt es ein System zur Verfolgung und Abschließung von Sicherheitsmaßnahmen?', text_tr: 'Güvenlik aksiyonlarının takibi ve kapanışı için bir sistem var mı?' }
];
