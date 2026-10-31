from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pathlib import Path
import textwrap
root=Path(__file__).resolve().parents[1]
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
if Path(font).exists(): pdfmetrics.registerFont(TTFont('Body',font)); body='Body'
else: body='Helvetica'
W,H=595.28,841.89

def make(filename,kit=False):
 c=canvas.Canvas(str(root/'src'/filename),pagesize=(W,H));c.setTitle('Moein Abdi | '+('Partnership Media Kit' if kit else 'Athletic CV'));c.setAuthor('Moein Abdi — prepared from supplied project information');
 c.setFillColor(HexColor('#101820'));c.rect(0,H-255,W,255,fill=1,stroke=0)
 c.setFillColor(HexColor('#e4eb29'));c.rect(42,H-62,8,24,fill=1,stroke=0);c.rect(54,H-69,8,38,fill=1,stroke=0);c.rect(66,H-59,8,18,fill=1,stroke=0)
 c.setFillColor(white);c.setFont('Helvetica-Bold',33);c.drawString(42,H-115,'MOEIN ABDI');c.setFont(body,12);c.drawString(42,H-144,'MTB Cross-Country Athlete & Cycling Coach');c.setFont('Helvetica-Bold',23);c.drawString(42,H-192,'Built for the Climb.');c.setFont(body,9);c.setFillColor(HexColor('#cdd4d8'));c.drawString(42,H-222,'PARTNERSHIP MEDIA KIT' if kit else 'ATHLETIC PROFILE / RECRUITMENT CV')
 y=H-295
 def section(title,lines):
  nonlocal y
  c.setFillColor(HexColor('#111111'));c.setFont('Helvetica-Bold',14);c.drawString(42,y,title);y-=23;c.setFont(body,9.5);c.setFillColor(HexColor('#565656'))
  for line in lines:
   for wrapped in textwrap.wrap(line,94):c.drawString(42,y,wrapped);y-=15
   y-=4
  y-=15
 if kit:
  section('A focused partnership opportunity',[
   'Iranian mountain bike cross-country athlete and cycling coach, exploring team and partnership opportunities in the UAE and internationally.',
   'Potential conversations include equipment support, athlete development, product feedback, and authentic cycling-related content. Scope and rights require agreement.'])
  section('Athletic background — athlete-reported',[
   'Four consecutive Khorasan Razavi provincial championship titles.',
   'Multiple national runner-up finishes in the U23 category.',
   'Former Iranian national-team membership and training-camp participation.',
   'Individual dates and official event records have not yet been supplied.'])
  section('Coaching profile — source checked',[
   'VO2 lists a domestic Level 3 coaching qualification and mountain cycling specialization, Khorasan Razavi, and Davandegan Koohestan club.',
   'This is not presented as a UCI-accredited international coaching certificate.'])
  section('Partnership process',[
   'Discuss brand objectives, suitable deliverables, permissions, duration, and evaluation.',
   'No audience metrics, existing sponsors, guaranteed reach, or commercial outcomes are claimed.'])
 else:
  section('Athlete profile',[
   'Nationality: Iranian. Primary discipline: MTB XC / XCO.',
   'Competitive background: Iranian provincial and national competition.',
   'Career interest: international racing and coaching opportunities, with emphasis on the UAE.'])
  section('Competitive background — athlete-reported',[
   'Four consecutive provincial championship titles in Khorasan Razavi, Iran.',
   'Multiple Iranian national U23 runner-up finishes.',
   'Former Iranian national cycling team membership and training-camp participation.',
   'These statements are based on project information. Official event records remain to be supplied. No national championship victory or international result is claimed.'])
  section('Coaching background — source checked',[
   'Public VO2 profile: domestic Level 3 coaching qualification; mountain cycling specialization; Khorasan Razavi; Davandegan Koohestan club.',
   'Not a claim of UCI-accredited international coaching certification.'])
  section('Professional evaluation',[
   'Current team, availability, and supporting records: please enquire directly.',
   'No estimated physiological metrics or active UCI ranking are published. Age is omitted pending confirmation because source information differs.'])
 c.setStrokeColor(HexColor('#dddddd'));c.line(42,95,W-42,95);c.setFillColor(HexColor('#555555'));c.setFont(body,8)
 c.drawString(42,77,'Enquiries: moein-abdi-athlete.titanaraino.chatgpt.site/contact')
 c.drawString(42,62,'Source: VO2 public coaching profile + athlete representative project brief.')
 c.drawString(42,47,'Prepared for private review. Athlete name, claims, and media require final approval.')
 c.linkURL('https://moein-abdi-athlete.titanaraino.chatgpt.site/contact',(42,72,W-42,87),relative=0)
 c.save()
make('moein-abdi-athletic-cv.pdf');make('moein-abdi-media-kit.pdf',True)
