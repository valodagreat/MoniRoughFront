
export const capitalize = (str) => {
  if (str) {
    str = str.split(" ");
    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
  }
};

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN"
});

export const number = new Intl.NumberFormat("en-NG", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export const calculatePercentage = (item) => {
    const Tasks = item?.tasks
    const completed = Tasks?.filter(item => item.status === true);
    return (completed?.length / Tasks?.length) * 100
}
export const calculateCausePercentage = (item) => {
    return (item?.amount_raised / item?.target) * 100
}

export const capital_validation = /^(?=.*[A-Z])/
export const small_validation = /^(?=.*[a-z])/
export const number_validation = /^(?=.*[0-9])/

export const tableData = [
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"},
  {id: "#1234" ,FullName: "Amaka Nweke" ,location: "Lagos, Nigeria" ,age: "23" ,occupation: "Student" ,userType: "Community Member" ,status: "Active"}
];

export const trybersTestQuestions = [
  {
    question : "You regularly make new friends?", 
    answers: {
      "YES": true,
      "NO": false,
      "MAYBE": false,
    }
  },{
    question: 'You usually stay calm, even under a lot of pressure?',
    answers: {
      "YES": true,
      "NO": false,
      "MAYBE": false,
      // "I don't know": false,
    }
  },{
    question: 'At social events, you rarely try to introduce yourself to new people and mostly talk to the ones you already know?',
    answers: {
      "YES": false,
      "NO": true,
      "MAYBE": false,
    }
  },{
    question: 'Even a small mistake can cause you to doubt your overall abilities and knowledge?',
    answers: {
      "YES": false,
      "NO": false,
      "MAYBE": true,
    }
  },{
    question: 'You feel comfortable just walking up to someone you find interesting and striking up a conversation?',
    answers: {
      "YES": true,
      "NO": false,
      "MAYBE": false,
    }
  },{
    question: 'You enjoy participating in group activities?',
    answers: {
      "YES": true,
      "NO": false,
      "MAYBE": true,
    }
  },{
    question: 'You are interested in so many things that you find it difficult to choose what to try next?',
    answers: {
      "YES": true,
      "NO": false,
      "MAYBE": true,
    }
  },{
    question: 'You avoid leadership roles in group settings?',
    answers: {
      "YES": false,
      "NO": true,
      "MAYBE": true,
    }
  },{
    question: 'You tend to avoid drawing attention to yourself?',
    answers: {
      "YES": false,
      "NO": true,
      "MAYBE": true,
    }
  },{
    question: 'Your mood can change very quickly?',
    answers: {
      "YES": false,
      "NO": true,
      "MAYBE": false,
    }
  },{
    question: 'You often end up doing things at the last possible moment?',
    answers: {
      "YES": false,
      "NO": true,
      "MAYBE": false,
    }
  },{
    question: 'You find it easy to empathize with a person whose experiences are very different from yours?',
    answers: {
      "YES": true,
      "NO": false,
      "MAYBE": true,
    }
  },{
    question: 'In your social circle, you are often the one who contacts your friends and initiates activities?',
    answers: {
      "YES": true,
      "NO": false,
      "MAYBE": false,
    }
  },{
    question: 'Your personal work/learning style is closer to spontaneous bursts of energy than organized and consistent efforts?',
    answers: {
      "YES": false,
      "NO": true,
      "MAYBE": false,
    }
  },{
    question: 'You struggle with deadlines?',
    answers: {
      "YES": false,
      "NO": true,
      "MAYBE": false,
      
    }
  }
]