interface Question {
  id: number;
  category: '1S - Sort' | '2S - Set in Order' | '3S - Shine' | '4S - Standardize' | '5S - Sustain';
  text: string;
  text_de?: string;
  text_tr?: string;
}

export const questions: Question[] = [
  // 1S - Sort
  { id: 1, category: '1S - Sort', text: 'Are unnecessary items clearly identified and separated?', text_de: 'Sind unnötige Gegenstände klar identifiziert und getrennt?', text_tr: 'Gereksiz eşyalar net bir şekilde tanımlanıp ayrılmış mı?' },
  { id: 2, category: '1S - Sort', text: 'Is the work area free from unnecessary equipment and tools?', text_de: 'Ist der Arbeitsbereich frei von unnötigen Geräten und Werkzeugen?', text_tr: 'Çalışma alanı gereksiz ekipman ve araçlardan arındırılmış mı?' },
  { id: 3, category: '1S - Sort', text: 'Are all storage areas free from unused or obsolete items?', text_de: 'Sind alle Lagerbereiche frei von ungenutzten oder veralteten Gegenständen?', text_tr: 'Tüm depolama alanları kullanılmayan veya eski eşyadan arındırılmış mı?' },
  { id: 4, category: '1S - Sort', text: 'Is documentation current and free from obsolete versions?', text_de: 'Ist die Dokumentation aktuell und frei von veralteten Versionen?', text_tr: 'Dokümantasyon güncel mi ve eski sürümlerden arındırılmış mı?' },
  { id: 5, category: '1S - Sort', text: 'Are red tags being used effectively to identify unnecessary items?', text_de: 'Werden rote Etiketten effektiv zur Identifizierung unnötiger Gegenstände verwendet?', text_tr: 'Gereksiz eşyaları belirlemek için kırmızı etiketler etkili bir şekilde kullanılıyor mu?' },

  // 2S - Set in Order
  { id: 6, category: '2S - Set in Order', text: 'Are all items in designated and clearly marked locations?', text_de: 'Befinden sich alle Gegenstände an festgelegten und klar markierten Orten?', text_tr: 'Tüm eşyalar belirlenmiş ve açıkça işaretlenmiş yerlerde mi?' },
  { id: 7, category: '2S - Set in Order', text: 'Are storage locations sized appropriately for the items they contain?', text_de: 'Sind Lagerorte angemessen für die enthaltenen Gegenstände dimensioniert?', text_tr: 'Depolama alanları içerdiği eşyalar için uygun boyutlandırılmış mı?' },
  { id: 8, category: '2S - Set in Order', text: 'Are visual controls and labels clearly visible and maintained?', text_de: 'Sind visuelle Kontrollen und Beschriftungen deutlich sichtbar und gepflegt?', text_tr: 'Görsel kontroller ve etiketler net bir şekilde görülebiliyor ve korunuyor mu?' },
  { id: 9, category: '2S - Set in Order', text: 'Is the floor layout clearly marked and respected?', text_de: 'Ist das Bodenlayout klar markiert und wird es respektiert?', text_tr: 'Zemin yerleşimi açıkça işaretlenmiş ve kurallara uygun mu?' },
  { id: 10, category: '2S - Set in Order', text: 'Are tools and equipment stored in order of frequency of use?', text_de: 'Werden Werkzeuge und Geräte nach Häufigkeit der Verwendung gelagert?', text_tr: 'Aletler ve ekipmanlar kullanım sıklığına göre mi yerleştirilmiş?' },

  // 3S - Shine
  { id: 11, category: '3S - Shine', text: 'Are work areas clean and free from dirt, dust, and debris?', text_de: 'Sind Arbeitsbereiche sauber und frei von Schmutz, Staub und Ablagerungen?', text_tr: 'Çalışma alanları temiz ve kir, toz veya kalıntılardan arınmış mı?' },
  { id: 12, category: '3S - Shine', text: 'Are cleaning materials readily available in designated areas?', text_de: 'Sind Reinigungsmaterialien in ausgewiesenen Bereichen leicht verfügbar?', text_tr: 'Temizlik malzemeleri belirlenen alanlarda kolay erişilebilir mi?' },
  { id: 13, category: '3S - Shine', text: 'Are machines and equipment kept clean and well-maintained?', text_de: 'Werden Maschinen und Geräte sauber und gut gewartet?', text_tr: 'Makineler ve ekipmanlar temiz ve iyi durumda mı?' },
  { id: 14, category: '3S - Shine', text: 'Are cleaning schedules posted and followed?', text_de: 'Sind Reinigungspläne ausgehängt und werden sie befolgt?', text_tr: 'Temizlik planları asılmış ve takip ediliyor mu?' },
  { id: 15, category: '3S - Shine', text: 'Are light fixtures, windows, and vents kept clean?', text_de: 'Werden Leuchten, Fenster und Lüftungsöffnungen sauber gehalten?', text_tr: 'Aydınlatmalar, camlar ve havalandırma açıklıkları temiz tutuluyor mu?' },

  // 4S - Standardize
  { id: 16, category: '4S - Standardize', text: 'Are standard operating procedures visible and current?', text_de: 'Sind Standardarbeitsanweisungen sichtbar und aktuell?', text_tr: 'Standart işletim prosedürleri görünür ve güncel mi?' },
  { id: 17, category: '4S - Standardize', text: 'Are visual management tools consistently used?', text_de: 'Werden visuelle Managementtools konsequent eingesetzt?', text_tr: 'Görsel yönetim araçları tutarlı şekilde kullanılıyor mu?' },
  { id: 18, category: '4S - Standardize', text: 'Are inspection and cleaning schedules standardized?', text_de: 'Sind Inspektions- und Reinigungspläne standardisiert?', text_tr: 'Denetim ve temizlik planları standartlaştırılmış mı?' },
  { id: 19, category: '4S - Standardize', text: 'Is there a standard color-coding system in place?', text_de: 'Gibt es ein standardisiertes Farbcodiersystem?', text_tr: 'Standart bir renk kodlama sistemi mevcut mu?' },
  { id: 20, category: '4S - Standardize', text: 'Are 5S procedures integrated into daily work?', text_de: 'Sind 5S-Verfahren in die tägliche Arbeit integriert?', text_tr: '5S prosedürleri günlük çalışmalara entegre edilmiş mi?' },

  // 5S - Sustain
  { id: 21, category: '5S - Sustain', text: 'Are regular audits conducted and documented?', text_de: 'Werden regelmäßige Audits durchgeführt und dokumentiert?', text_tr: 'Düzenli denetimler yapılıyor ve belgeleniyor mu?' },
  { id: 22, category: '5S - Sustain', text: 'Is there evidence of continuous improvement in 5S practices?', text_de: 'Gibt es Anzeichen für kontinuierliche Verbesserung der 5S-Praktiken?', text_tr: '5S uygulamalarında sürekli iyileştirme olduğuna dair kanıt var mı?' },
  { id: 23, category: '5S - Sustain', text: 'Are all employees trained in 5S principles?', text_de: 'Sind alle Mitarbeiter in 5S-Prinzipien geschult?', text_tr: 'Tüm çalışanlar 5S prensipleri konusunda eğitimli mi?' },
  { id: 24, category: '5S - Sustain', text: 'Is there a system for tracking and addressing 5S issues?', text_de: 'Gibt es ein System zur Verfolgung und Behebung von 5S-Problemen?', text_tr: '5S problemlerini takip etmek ve çözmek için bir sistem var mı?' },
  { id: 25, category: '5S - Sustain', text: 'Are 5S results displayed and regularly updated?', text_de: 'Werden 5S-Ergebnisse angezeigt und regelmäßig aktualisiert?', text_tr: '5S sonuçları görüntüleniyor ve düzenli olarak güncelleniyor mu?' }
];
