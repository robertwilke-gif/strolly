import type { Tour } from '@/content/tours/types'

export type { Tour, TourPoi } from '@/content/tours/types'

export const altstadtTour: Tour = {
  slug: 'altstadt',
  area: 'Altstadt',
  title: 'Märchenkönige & Mordsgeschichten',
  durationMin: 75,
  triggerRadiusM: 100,
  start: { lat: 48.1374, lng: 11.5755 },
  pois: [
    {
      id: 'marienplatz',
      order: 1,
      lat: 48.1374,
      lng: 11.5755,
      name: 'Marienplatz',
      blurb: 'Warum das Glockenspiel zweimal lügt.',
      story:
        'Der Münchner Marienplatz ist das Wohnzimmer der Stadt – mit einem Glockenspiel, das täglich dasselbe Schauspiel abzieht und so tut, als wäre es 1568. Tatsächlich wurde der ganze Spaß erst 1908 eingebaut – aus reinem Marketing-Trotz gegen Nürnberg. Schau hoch und nick anerkennend, du Insider.',
    },
    {
      id: 'alter-peter',
      order: 2,
      lat: 48.1366,
      lng: 11.5756,
      name: 'Alter Peter',
      blurb: 'Münchens älteste Drama-Queen.',
      story:
        'Der Alte Peter steht hier seit über 800 Jahren rum und hat schon mehr Brände, Belagerungen und Bombennächte mitgemacht als jeder andere in der Stadt. Wenn du die 306 Stufen hochkletterst, bekommst du nicht nur Aussicht, sondern auch die Quittung dafür in den Waden. Lohnt sich trotzdem.',
    },
    {
      id: 'viktualienmarkt',
      order: 3,
      lat: 48.1351,
      lng: 11.5763,
      name: 'Viktualienmarkt',
      blurb: 'Bier-Brunnen statt Wasser-Brunnen.',
      story:
        'Hier kostet das Radieschen mehr als woanders, aber dafür kannst du es vom Karl-Valentin-Brunnen aus genießen. Sechs Münchner Brauereien teilen sich den Biergarten – jede zwei Monate ist eine andere dran. Keine Sorge: keine ist schlecht.',
    },
    {
      id: 'asamkirche',
      order: 4,
      lat: 48.1349,
      lng: 11.5713,
      name: 'Asamkirche',
      blurb: 'Barock auf Speed.',
      story:
        'Die Brüder Asam haben sich diese Kirche selbst gebaut – als Privatkapelle direkt neben ihrem Wohnzimmer. Als die Münchner protestierten, mussten sie sie öffentlich machen. Heute der wohl überdrehteste Barock-Bonbon, den du je in dreißig Quadratmetern gesehen hast.',
    },
    {
      id: 'sendlinger-tor',
      order: 5,
      lat: 48.1336,
      lng: 11.568,
      name: 'Sendlinger Tor',
      blurb: 'Die Stadtmauer, die fast keine mehr ist.',
      story:
        'Drei Tore haben den Abriss der Münchner Stadtmauer überlebt – das Sendlinger Tor ist eines davon. Heute fahren Trambahnen durch, wo früher Salzhändler und Bauernarmeen anstanden. Bonus: der Platz davor ist seit der Renovierung verkehrsberuhigt – Münchner halten das für eine Sensation.',
    },
    {
      id: 'karlsplatz',
      order: 6,
      lat: 48.1396,
      lng: 11.566,
      name: 'Karlsplatz (Stachus)',
      blurb: 'Der Platz, den niemand Karl nennt.',
      story:
        'Offiziell heißt er Karlsplatz, nach einem Kurfürst, den die Münchner nicht mochten. Also nennen sie ihn beharrlich „Stachus" – nach einem Wirt, der hier mal eine Gaststätte hatte. Es gibt kaum etwas, das Münchner lieber tun, als sich gegen Obrigkeiten zu stellen. Außer Bier trinken.',
    },
    {
      id: 'frauenkirche',
      order: 7,
      lat: 48.1385,
      lng: 11.5734,
      name: 'Frauenkirche',
      blurb: 'Der Teufel war hier – und ist verärgert abgereist.',
      story:
        'Die Zwiebeltürme sind so München wie Brezn und Granteln. Drinnen findest du den Teufelstritt: ein Fußabdruck im Boden, der angeblich vom Teufel selbst stammt. Die Story ist Quatsch, aber so eine gute, dass sie seit 500 Jahren erzählt wird.',
    },
    {
      id: 'theatinerkirche',
      order: 8,
      lat: 48.1418,
      lng: 11.5762,
      name: 'Theatinerkirche',
      blurb: 'Die gelbe Kuppel, die niemand übersieht.',
      story:
        'Diese Kirche ist ein bisschen, als hätten sich Italien und Bayern auf ein Bier getroffen und beschlossen: machen wir was zusammen. Das Gelb der Fassade kommt nicht aus Bayern – sondern aus Rom, weil die Wittelsbacher mal wieder unbedingt katholisch genug aussehen wollten.',
    },
    {
      id: 'odeonsplatz',
      order: 9,
      lat: 48.1419,
      lng: 11.5773,
      name: 'Odeonsplatz',
      blurb: 'Wo Hitler 1923 gestoppt wurde.',
      story:
        'An der Feldherrnhalle endete 1923 der Hitlerputsch – die Polizei schoss, das Kapitel war damit erstmal vorbei. Heute kann man hier ungestört Kaffee trinken, ein Konzert besuchen oder einfach den Skatern beim Stürzen zusehen. Die Geschichte: schwer. Der Platz selbst: leicht.',
    },
    {
      id: 'residenz',
      order: 10,
      lat: 48.1418,
      lng: 11.5778,
      name: 'Münchner Residenz',
      blurb: 'Wo die Wittelsbacher sich nicht einig wurden.',
      story:
        '500 Jahre lang regierten die Wittelsbacher von hier aus – und stritten sich nebenbei über Stil, Glauben und wer welche Tochter heiraten muss. 130 Räume, zehn Innenhöfe, eine Schatzkammer voller Dinge, die niemand mehr trägt. Die Audioguides darin sind übrigens deutlich langweiliger als ich.',
    },
    {
      id: 'maximilianstrasse',
      order: 11,
      lat: 48.1389,
      lng: 11.579,
      name: 'Maximilianstraße',
      blurb: 'München in teuer.',
      story:
        'Die Maximilianstraße ist Münchens Antwort auf die Champs-Élysées – nur kürzer, kühler und mit mehr Pelzgeschäften. Hier kannst du dir Taschen ansehen, die mehr kosten als deine Miete. Oder du gehst einfach weiter zum Nationaltheater am Ende – das ist gratis von außen.',
    },
    {
      id: 'hofbraeuhaus',
      order: 12,
      lat: 48.1378,
      lng: 11.5797,
      name: 'Hofbräuhaus',
      blurb: 'Wo das Bier den Tourist findet.',
      story:
        'Das Hofbräuhaus ist das berühmteste Wirtshaus der Welt – und gleichzeitig der Ort, an dem du am wenigsten Münchner triffst. Macht aber nichts, denn die Blaskapelle, das Bier und das Hendl gehen trotzdem ihren bayerischen Gang. Setz dich, bestell eine Maß, und freu dich, dass du fertig bist mit der Tour.',
    },
  ],
}
