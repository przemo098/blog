'use client';

import CvParagraph from './CvParagraph';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-slate-500">{icon}</div>
      <div>
        <div className="text-xs text-slate-400 uppercase tracking-wide">{label}</div>
        <div className="text-slate-700 font-medium">{value}</div>
      </div>
    </div>
  );
}

export default function CvContact() {
  return (
    <div>
      <CvParagraph text="Contact" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ContactItem icon={<PersonIcon fontSize="small" />} label="Name" value="Przemysław Kamiński" />
        <ContactItem icon={<LocationOnIcon fontSize="small" />} label="Location" value="Wrocław, Poland (remote)" />
        <ContactItem icon={<PhoneIcon fontSize="small" />} label="Phone" value="+48 730 441 993" />
        <ContactItem icon={<EmailIcon fontSize="small" />} label="Email" value="kaminski.przemyslaw@hotmail.com" />
        <ContactItem icon={<LanguageIcon fontSize="small" />} label="Web" value="kaminski.consulting" />
        <ContactItem icon={<GitHubIcon fontSize="small" />} label="GitHub" value="github.com/przemo098" />
      </div>
    </div>
  );
}
