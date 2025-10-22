interface MHEQuestion {
  id: number;
  category: 'Equipment Condition' | 'Operational Safety' | 'Maintenance' | 'Operator Compliance' | 'Documentation';
  text: string;
  text_de?: string;
  text_tr?: string;
}

export const mheQuestions: MHEQuestion[] = [
  // Equipment Condition
  { id: 1, category: 'Equipment Condition', text: 'Is the equipment free from visible damage or defects?', text_de: 'Ist das Gerät frei von sichtbaren Schäden oder Defekten?', text_tr: 'Ekipman görünür hasar veya kusurlardan arınmış mı?' },
  { id: 2, category: 'Equipment Condition', text: 'Are all safety features and guards intact and properly secured?', text_de: 'Sind alle Sicherheitsmerkmale und Schutzvorrichtungen intakt und ordnungsgemäß gesichert?', text_tr: 'Tüm güvenlik özellikleri ve korumalar sağlam ve düzgün şekilde sabitlenmiş mi?' },
  { id: 3, category: 'Equipment Condition', text: 'Are tires/wheels in good condition with proper tread and inflation?', text_de: 'Sind Reifen/Räder in gutem Zustand mit angemessenem Profil und Luftdruck?', text_tr: 'Lastikler/tekerlekler uygun diş derinliği ve şişirme ile iyi durumda mı?' },
  { id: 4, category: 'Equipment Condition', text: 'Are forks/attachments free from cracks, bends, or excessive wear?', text_de: 'Sind Gabeln/Anbaugeräte frei von Rissen, Verbiegungen oder übermäßigem Verschleiß?', text_tr: 'Çatallar/ek parçalar çatlak, eğilme veya aşırı aşınmadan arınmış mı?' },
  { id: 5, category: 'Equipment Condition', text: 'Are hydraulic systems free from leaks and functioning properly?', text_de: 'Sind Hydrauliksysteme frei von Lecks und funktionieren sie ordnungsgemäß?', text_tr: 'Hidrolik sistemler sızıntısız ve düzgün şekilde çalışıyor mu?' },

  // Operational Safety
  { id: 6, category: 'Operational Safety', text: 'Are load capacity charts clearly visible and legible?', text_de: 'Sind Lasttabellen deutlich sichtbar und lesbar?', text_tr: 'Yük kapasite tabloları açıkça görülebilir ve okunabilir mi?' },
  { id: 7, category: 'Operational Safety', text: 'Are warning devices (lights, horns, backup alarms) functional?', text_de: 'Sind Warnvorrichtungen (Lichter, Hupen, Rückfahralarme) funktionsfähig?', text_tr: 'Uyarı cihazları (ışıklar, kornalar, geri vites alarmları) çalışıyor mu?' },
  { id: 8, category: 'Operational Safety', text: 'Are controls properly labeled and functioning as intended?', text_de: 'Sind Bedienelemente ordnungsgemäß beschriftet und funktionieren wie vorgesehen?', text_tr: 'Kontroller düzgün şekilde etiketlenmiş ve amaçlandığı gibi çalışıyor mu?' },
  { id: 9, category: 'Operational Safety', text: 'Is the operator\'s view unobstructed during operation?', text_de: 'Ist die Sicht des Bedieners während des Betriebs ungehindert?', text_tr: 'Operasyon sırasında operatörün görüşü engelsiz mi?' },
  { id: 10, category: 'Operational Safety', text: 'Are speed limits and traffic rules clearly posted and followed?', text_de: 'Sind Geschwindigkeitsbegrenzungen und Verkehrsregeln deutlich angezeigt und werden sie befolgt?', text_tr: 'Hız sınırları ve trafik kuralları net bir şekilde belirtilmiş ve uyuluyor mu?' },

  // Maintenance
  { id: 11, category: 'Maintenance', text: 'Is there a documented pre-operational inspection process?', text_de: 'Gibt es einen dokumentierten Prozess für Inspektionen vor dem Betrieb?', text_tr: 'Operasyon öncesi kontroller için belgelenmiş bir süreç var mı?' },
  { id: 12, category: 'Maintenance', text: 'Are maintenance records up-to-date and accessible?', text_de: 'Sind Wartungsaufzeichnungen aktuell und zugänglich?', text_tr: 'Bakım kayıtları güncel ve erişilebilir mi?' },
  { id: 13, category: 'Maintenance', text: 'Is there a system for reporting and addressing equipment issues?', text_de: 'Gibt es ein System zur Meldung und Behebung von Geräteproblemen?', text_tr: 'Ekipman sorunlarını bildirme ve çözme sistemi var mı?' },
  { id: 14, category: 'Maintenance', text: 'Are scheduled maintenance tasks completed on time?', text_de: 'Werden geplante Wartungsaufgaben pünktlich abgeschlossen?', text_tr: 'Planlı bakım görevleri zamanında tamamlanıyor mu?' },
  { id: 15, category: 'Maintenance', text: 'Are batteries/fuel systems properly maintained and stored?', text_de: 'Werden Batterien/Kraftstoffsysteme ordnungsgemäß gewartet und gelagert?', text_tr: 'Piller/yakıt sistemleri düzgün şekilde bakımı yapılmış ve depolanmış mı?' },

  // Operator Compliance
  { id: 16, category: 'Operator Compliance', text: 'Do operators have valid certification/training for the equipment?', text_de: 'Verfügen Bediener über gültige Zertifizierungen/Schulungen für das Gerät?', text_tr: 'Operatörlerin ekipman için geçerli sertifikası/eğitimi var mı?' },
  { id: 17, category: 'Operator Compliance', text: 'Are operators using proper PPE (helmets, safety shoes, etc.)?', text_de: 'Verwenden Bediener angemessene PSA (Helme, Sicherheitsschuhe usw.)?', text_tr: 'Operatörler uygun KKD (kask, güvenlik ayakkabısı vb.) kullanıyor mu?' },
  { id: 18, category: 'Operator Compliance', text: 'Do operators perform pre-operational checks consistently?', text_de: 'Führen Bediener konsequent Kontrollen vor dem Betrieb durch?', text_tr: 'Operatörler operasyon öncesi kontrolleri düzenli olarak yapıyor mu?' },
  { id: 19, category: 'Operator Compliance', text: 'Are operators following safe operating procedures?', text_de: 'Befolgen Bediener sichere Betriebsverfahren?', text_tr: 'Operatörler güvenli çalışma prosedürlerine uyuyor mu?' },
  { id: 20, category: 'Operator Compliance', text: 'Is there a system to prevent unauthorized equipment use?', text_de: 'Gibt es ein System zur Verhinderung unbefugter Gerätenutzung?', text_tr: 'Yetkisiz ekipman kullanımını önlemek için bir sistem var mı?' },

  // Documentation
  { id: 21, category: 'Documentation', text: 'Are equipment manuals readily available to operators?', text_de: 'Sind Gerätehandbücher für Bediener leicht verfügbar?', text_tr: 'Ekipman kılavuzları operatörlerin kolayca erişebileceği yerde mi?' },
  { id: 22, category: 'Documentation', text: 'Is there a documented training program for equipment operators?', text_de: 'Gibt es ein dokumentiertes Schulungsprogramm für Gerätebediener?', text_tr: 'Ekipman operatörleri için belgelenmiş bir eğitim programı var mı?' },
  { id: 23, category: 'Documentation', text: 'Are incident reports properly documented and reviewed?', text_de: 'Werden Vorfallberichte ordnungsgemäß dokumentiert und überprüft?', text_tr: 'Olay raporları düzgün şekilde belgelenmiş ve gözden geçirilmiş mi?' },
  { id: 24, category: 'Documentation', text: 'Is there a system for tracking equipment utilization and efficiency?', text_de: 'Gibt es ein System zur Verfolgung der Gerätenutzung und -effizienz?', text_tr: 'Ekipman kullanımı ve verimliliğini takip eden bir sistem var mı?' },
  { id: 25, category: 'Documentation', text: 'Are equipment modification records maintained and approved?', text_de: 'Werden Aufzeichnungen über Gerätemodifikationen geführt und genehmigt?', text_tr: 'Ekipman modifikasyon kayıtları tutulup onaylanıyor mu?' }
];
