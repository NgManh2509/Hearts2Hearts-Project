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
        bio: "Jiwoo is a charismatic leader with a strong sense of responsibility and maturity. She has sharp, refined visuals that give off a confident and slightly cool vibe. On stage, she commands attention with her powerful expressions and stable performance skills. Despite her serious image, she has a caring and playful side when she’s with the members. She’s the kind of leader who balances discipline and warmth effortlessly.",
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
        bio: "Carmen is known for her calm and elegant aura that naturally draws people in. As an Indonesian member, she brings a unique charm and global appeal to the group. Her visuals are soft yet striking, with expressive eyes that stand out on stage. Off stage, she is gentle and thoughtful, often taking care of the members quietly. Her presence feels warm, like someone you can always rely on.",
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
        bio: "Ian stands out with her unique and slightly androgynous charm. Her visuals are cool and distinctive, giving her a strong individual identity. She has a confident personality and isn’t afraid to be herself. On stage, she radiates charisma with a bold and stylish presence. Off stage, she’s surprisingly relaxed and has a down-to-earth vibe.",
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
        bio: "Juun has a chic and modern look that feels effortlessly stylish. Her personality is cool and composed, but she also has a subtle sense of humor. She often surprises fans with her witty remarks and relaxed attitude. On stage, she delivers clean and precise performances that highlight her professionalism. Her vibe is both trendy and approachable at the same time.",
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
        bio: "Stella gives off a dreamy and slightly mysterious vibe that makes her stand out. Her visuals are elegant and delicate, almost like a character from a fantasy story. She tends to be more reserved, but her quiet personality adds to her charm. When performing, she transforms into someone captivating and graceful. Her duality between shy and charismatic is what fans love most.",
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
        bio: "Ye-on has a soft and innocent visual that gives off a gentle first impression. Her personality is sweet and kind, often showing her caring nature toward others. She may seem quiet at first, but she has a warm and sincere heart. On stage, she delivers graceful and emotional performances. Her charm lies in her purity and subtle elegance.",
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
        bio: "A-na is full of energy and brings a vibrant spirit to the group. Her visuals are bright and eye-catching, with a playful and youthful charm. She has an outgoing personality and isn’t afraid to express herself. On stage, she’s dynamic and full of movement, making her performances exciting to watch. Off stage, she’s talkative and brings positive energy to everyone around her.",
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
        bio: "Yuha has a bright and refreshing energy that instantly lifts the mood of the group. Her visuals are youthful and lively, often described as naturally cute without trying too hard. She’s known for her cheerful personality and positive attitude. On stage, she shines with her expressive facial reactions and engaging presence. Off stage, she’s playful and loves making others laugh.",
        imageLink:[
            new URL('../assets/MemberImg/Yuha/yuha (1).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Yuha/yuha (2).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Yuha/yuha (3).webp', import.meta.url).href,
            new URL('../assets/MemberImg/Yuha/yuha (4).webp', import.meta.url).href,
        ]
    }
]

export default memberData;