# Trimm Dich zu Hause

**This project has been created during the #WirVsVirus Hackathon from the german government. https://wirvsvirushackathon.devpost.com/**

## Inspiration
Abstand halten, Kontakte einschränken: in Zeiten der Corona-Krise ist die Zeit der Isolation für viele eine Herausforderung. Wir glauben daran, dass virtueller Kontakt und Bewegung helfen und ein wichtiger Bestandteil für uns in der nächsten Zeit sein werden.

Während Deutschland zuhause in Quarantäne sitzt, stehen schlagartig viele Trainer, Yogalehrer, Kursleiter und Vereine ohne Teilnehmer vor verschlossenen Studios. Was gäbe es somit besseres als sie zu Dir ins Wohnzimmer zu bringen und Euch miteinander zu verbinden. Inspiriert durch die Trimm-Dich-Bewegung aus den 70er bleiben wir gemeinsam daheim fit - auch in Quarantäne.

## What it does
_Trimm Dich zuhause_ bietet eine kostenlose Sport-Platform, die Menschen miteinander verbindet. Finde online Trainingspartner, trainiere in Echtzeit, verabrede Dich zu Trainingseinheiten mit anderen Sportsfreunden oder nehme an virtuellen Kursen von professionellen Trainern teil. Denn wir wissen alle, dass die Hemmschwelle eine Trainingseinheit sausen zu lassen geringer ist, wenn man sich dafür verabredet hat. Gleichzeitig hast Du die Chance, mit einer Spende für die Teilnahme an einem Kurs, einen wichtigen Beitrag zur Existenzsicherung Deiner Kursleiter zu leisten.

## How I built it
Die Platform _Trimm Dich zuhause_ ist in zwei technische Hauptkomponenten unterteilt. Das Backend mit NestJS Framework in Typescript programmiert. Zur Datenspeicherung wird eine PostgreSQL Datenbank verwendet. Die separate Frontend App wurde mit Next.js, React und TailwaindUI sowie Tailwind CSS entwickelt. Für die nahtlose Einbindung der Videokonferenzen verwenden wir die Platform jitsi (http://jitsi.org).

## Challenges I ran into
Es war herausfordernd ein Videokonferenz Tool zu finden, welches sich gut in die Platform integrieren lässt und somit eine einfache Handhabung für die Nutzer erlaubt.

## Accomplishments that I'm proud of
Wir sind stolz in der kürzer der Zeit eine komplett funktionstüchtige und sehr moderne Platform, inklusive Lading Page und Pitch Video kreiert zu haben. Aber natürlich auch Teil einer solchen Bewegung sein zu können.

## What I learned
"No bla, just do" - manchmal ist es besser einfach anzufangen als zu lange über jeglichen Lösungsansatz zu diskutieren.

## What's next for  015_e-Sport_Trimm Dich zu Hause
Zukünftig würden wir gerne die Möglichkeit anbieten, dass Du als User virtuelle Trimm-Dich-Pfade aus Deinen Trainingseinheiten zusammenstellen kannst. Somit könntest Du Dir Deinen individuellen Trainingsplan aus den unterschiedlichen Trainingseinheiten basteln und diesen mit deinen virtuellen Sportsfreunden teilen oder auch durchleben. Derzeit lassen sich außerdem Trainings nur manuell und nicht mittels einer integrierten Funktion teilen. Für alle ausgebildeten Trainer und Kursleiter soll es außerdem eine integrierte Spendenfunktion geben.
