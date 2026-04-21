function calculateAge(birthDay) {
    const today = new Date();
    const birthDate = new Date(birthDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const memberData = [
    {
        id:"m01",
        stageName:"Jiwoo",
        realName:"Choi Ji-woo",
        pos:"Leader, Dancer, Rapper, Vocalist, Visual",
        birthDay:"September 7, 2006",
        age: calculateAge("September 7, 2006").toString(),
        nationality: "Korean",
        birthPlace: "Godeok-dong, Gangdong-gu, Seoul, South Korea",
        bio: "Born Choi Ji-woo on September 7, 2006, she is a South Korean singer and the official leader of Hearts2Hearts. She plays a pivotal role in guiding the group and anchoring their live performances.",
        imageLink:[
            new URL('../assets/MemberImg/Jiwoo/jiwoo (1).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Jiwoo/jiwoo (2).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Jiwoo/jiwoo (3).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Jiwoo/jiwoo (4).webp', import.meta.url).href,
        ]
    },
    {
        id:"m02",
        stageName:"Carmen",
        realName:"Nyoman Ayu Carmenita",
        pos:"Vocalist",
        birthDay:"March 28, 2006",
        age: calculateAge("March 28, 2006").toString(),
        nationality: "Indonesian",
        birthPlace: "Denpasar, Bali, Indonesia",    
        bio: "Nyoman Ayu Carmenita, known professionally as Carmen, was born on March 28, 2006, and hails from Indonesia. As the group's Indonesian member, she brings a unique international presence and diverse appeal to their global fanbase.",
        imageLink:[
            new URL('../assets/MemberImg/Carmen/Carmen (1).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Carmen/Carmen (2).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Carmen/Carmen (3).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Carmen/Carmen (4).webp', import.meta.url).href,
        ]
    },
    {
        id:"m03",
        stageName:"Ian",
        realName:"Jeong Lee-an",
        pos:"Dancer, Vocalist, Visual, Center",
        birthDay:"October 9, 2009",
        age: calculateAge("October 9, 2009").toString(),
        nationality: "Korean",
        birthPlace: "Hyehwa-dong, Jongno-gu, Seoul, South Korea",
        bio: "Jeong I-an, performing under the name Ian, was born on October 9, 2009, in South Korea. As part of the group's younger \"maknae line,\" she is recognized for her immense potential and sharp stage presence.",
        imageLink:[
            new URL('../assets/MemberImg/Ian/Ian (1).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Ian/Ian (2).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Ian/Ian (3).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Ian/Ian (4).webp', import.meta.url).href,
        ]
    },
    {
        id:"m04",
        stageName:"Juun",
        realName:"Kim Ju-eun",
        pos:"Main Dancer, Rapper, Vocalist",
        birthDay:"December 3, 2008",
        age: calculateAge("December 3, 2008").toString(),
        nationality: "Korean",
        birthPlace: "Goyang, Gyeonggi-do, South Korea",
        bio: "Kim Ju-eun, who goes by the stage name Juun, is a South Korean singer born on December 3, 2008. She is known for bringing a bright, youthful energy to the stage and consistently captivating audiences with her charm.",
        imageLink:[
            new URL('../assets/MemberImg/Juun/juun (1).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Juun/juun (2).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Juun/juun (3).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Juun/juun (4).webp', import.meta.url).href,
        ]
    },
    {
        id:"m05",
        stageName:"Stella",
        realName:"Kim Da-hyun",
        pos:"Vocalist",
        birthDay:"June 18, 2007",
        age: calculateAge("June 18, 2007").toString(),
        nationality: "Korean-Canadian",
        birthPlace: "Ulsan, South Korea",
        bio: "Born Kim Da-hyun on June 18, 2007, Stella holds dual South Korean and Canadian nationality. Her multicultural background and versatile performance skills add a unique dynamic to the group's overall identity.",
        imageLink:[
            new URL('../assets/MemberImg/Stella/stella (1).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Stella/stella (2).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Stella/stella (3).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Stella/stella (4).webp', import.meta.url).href,
        ]
    },
    {
        id:"m06",
        stageName:"Ye-on",
        realName:"Kim Na-yeon",
        pos:"Vocalist, Maknae",
        birthDay:"April 19, 2010",
        age: calculateAge("April 19, 2010").toString(),
        nationality: "Korean",
        birthPlace: "Sangbuk-myeon, Yangsan, Gyeongsangnam-do, South Korea",
        bio: "Born Kim Na-yeon on April 19, 2010, Ye-on is a South Korean singer and the beloved maknae (youngest member) of Hearts2Hearts. Despite her young age, she showcases remarkable talent that perfectly complements her older members.",
        imageLink:[
            new URL('../assets/MemberImg/Ye-on/yeon (1).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Ye-on/yeon (2).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Ye-on/yeon (3).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Ye-on/yeon (4).webp', import.meta.url).href,
        ]
    },
    {
        id:"m07",
        stageName:"A-na",
        realName:"Roh Yu-na",
        pos:"Rapper, Vocalist, Visual",
        birthDay:"December 20, 2008",
        age: calculateAge("December 20, 2008").toString(),
        nationality: "Korean",
        birthPlace: "Seoul, South Korea",
        bio: "Born Roh Yu-na on December 20, 2008, A-na is a South Korean singer who shines as a core member of Hearts2Hearts. She contributes significantly to the group's distinct, dreamlike musical concept and aesthetic",
        imageLink:[
            new URL('../assets/MemberImg/A-na/A-na (1).webp', import.meta.url).href,
            new URL('../assets/MemberImg/A-na/A-na (2).webp', import.meta.url).href,
            new URL('../assets/MemberImg/A-na/A-na (3).webp', import.meta.url).href,
            new URL('../assets/MemberImg/A-na/A-na (4).webp', import.meta.url).href,
        ]
    },
    {
        id:"m08",
        stageName:"Yuha",
        realName:"Yu Ha-ram",
        pos:"Vocalist, Dancer",
        birthDay:"April 12, 2007",
        age: calculateAge("April 12, 2007").toString(),
        nationality: "Korean",
        birthPlace: "Bangokgwanseol-dong, Wonju, Gangwon-do, South Korea",
        bio: "Born Yu Ha-ram on April 12, 2007, she is a talented South Korean member of the group. She has been an essential part of Hearts2Hearts' vocal and dance lineups since their highly anticipated debut in February 2025.",
        imageLink:[
            new URL('../assets/MemberImg/Yuha/yuha (1).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Yuha/yuha (2).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Yuha/yuha (3).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Yuha/yuha (4).webp', import.meta.url).href,
        ]
    }
]

export default memberData;