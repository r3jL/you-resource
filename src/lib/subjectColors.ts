export interface SubjectStyle {
  bg: string;
  text: string;
  border: string;
  style: { background: string; color: string; border: string };
}

const subjectMap: Record<string, SubjectStyle> = {
  Mathematics: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(91,141,239,0.12)', color: '#5B8DEF', border: '1px solid rgba(91,141,239,0.30)' },
  },
  'Computer Science': {
    bg: '', text: '', border: '',
    style: { background: 'rgba(167,139,250,0.12)', color: '#A78BFA', border: '1px solid rgba(167,139,250,0.30)' },
  },
  Finance: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(212,165,116,0.14)', color: '#D4A574', border: '1px solid rgba(212,165,116,0.32)' },
  },
  Physics: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(78,205,196,0.12)', color: '#4ECDC4', border: '1px solid rgba(78,205,196,0.30)' },
  },
  'Machine Learning': {
    bg: '', text: '', border: '',
    style: { background: 'rgba(192,132,252,0.12)', color: '#C084FC', border: '1px solid rgba(192,132,252,0.30)' },
  },
  Statistics: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(96,165,250,0.12)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.30)' },
  },
  Economics: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(233,168,122,0.13)', color: '#E9A87A', border: '1px solid rgba(233,168,122,0.30)' },
  },
  Algorithms: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(244,114,182,0.12)', color: '#F472B6', border: '1px solid rgba(244,114,182,0.30)' },
  },
  Probability: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(125,211,252,0.12)', color: '#7DD3FC', border: '1px solid rgba(125,211,252,0.30)' },
  },
  Engineering: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(251,146,60,0.12)', color: '#FB923C', border: '1px solid rgba(251,146,60,0.30)' },
  },
  Chemistry: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(52,211,153,0.12)', color: '#34D399', border: '1px solid rgba(52,211,153,0.30)' },
  },
  Biology: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(163,230,53,0.12)', color: '#A3E635', border: '1px solid rgba(163,230,53,0.30)' },
  },
  'Data Science': {
    bg: '', text: '', border: '',
    style: { background: 'rgba(99,102,241,0.12)', color: '#818CF8', border: '1px solid rgba(99,102,241,0.30)' },
  },
  History: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(245,158,11,0.12)', color: '#FCD34D', border: '1px solid rgba(245,158,11,0.28)' },
  },
  Literature: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(244,63,94,0.12)', color: '#FDA4AF', border: '1px solid rgba(244,63,94,0.28)' },
  },
  Philosophy: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(167,139,250,0.12)', color: '#DDD6FE', border: '1px solid rgba(167,139,250,0.28)' },
  },
  Psychology: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(236,72,153,0.12)', color: '#F9A8D4', border: '1px solid rgba(236,72,153,0.28)' },
  },
  Geography: {
    bg: '', text: '', border: '',
    style: { background: 'rgba(249,115,22,0.12)', color: '#FDBA74', border: '1px solid rgba(249,115,22,0.28)' },
  },
};

const defaultStyle: SubjectStyle = {
  bg: '', text: '', border: '',
  style: { background: 'rgba(200,149,106,0.12)', color: '#C8956A', border: '1px solid rgba(200,149,106,0.28)' },
};

export function getSubjectColors(subject: string): SubjectStyle {
  return subjectMap[subject] || defaultStyle;
}
