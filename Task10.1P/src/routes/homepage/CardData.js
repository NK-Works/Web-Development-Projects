/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 26/08/2023                      */

// Define an array of objects containing fake card data
const CardData = [
    {
        key: 0,
        image: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fuploaded_file%2Ffile%2F194516%2Fimage-1582750515962-ef506c21c0db1d42e9abd7a8180e98eb.png',
        name:'Node.js - Bane/Boon', 
        description: 'A Node.js app runs in a single process, without creating a new thread for every request. Node.js provides a set of asynchronous I/O primitives in its standard library.',
        ratings: '4.2',
        first_name: 'Keith Sangwan', 
        link: 'https://nodejs.dev/en/learn/' 
    }, 
    // Getting mulitple structure for the page
    {
        key: 1,
        image: 'https://static.javatpoint.com/tutorial/reactjs/images/reactjs-tutorial.png',
        name:'Learn React', 
        description: 'ReactJS is one of the most popular JavaScript front-end libraries which has a strong foundation and a large community. Learn React and be a part of our community.',
        ratings: '4.5',
        first_name: 'Eren Yeager', 
        link: 'https://www.javatpoint.com/reactjs-tutorial' 
    },
    {
        key: 2,
        image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*c_fiB-YgbnMl6nntYGBMHQ.jpeg',
        name:'Machine Learning Decoded', 
        description: 'Machine Learning is the most widely used branch of computer science nowadays. It is used by many industries for automating tasks and doing complex data analysis.',
        ratings: '5',
        first_name: 'Abhinav Bindra', 
        link: 'https://becominghuman.ai/an-introduction-to-machine-learning-33a1b5d3a560' 
    },
    {
        key: 3,
        image: 'https://imageio.forbes.com/specials-images/imageserve/648aaa9fac6d92c810b12f50/Why-Companies-Are-Vastly-Underprepared-For-The-Risks-Posed-By-AI/960x0.jpg?format=jpg&width=1440',
        name:'AI - The Dilemma', 
        description: 'Due to the emergence of generative tools like ChatGPT, businesses across every industry are realizing its immense potential and starting to put it to use.',
        ratings: '3.8',
        first_name: 'Kirito Kazugaya', 
        link: 'https://www.forbes.com/sites/bernardmarr/2023/06/15/why-companies-are-vastly-underprepared-for-the-risks-posed-by-ai/?sh=590f6bb45609' 
    },
    {
        key: 4,
        image: 'https://s3images.zee5.com/wp-content/uploads/2023/04/025450k7ao98ooy2add77o.jpeg',
        name:'ChatGPT - You Ready', 
        description: 'In a new, unsettling twist, ChatGPT’s massive popularity can also be tied directly to today’s mainstream media headlines.',
        ratings: '3.2',
        first_name: 'Joe Beddin', 
        link: 'https://venturebeat.com/ai/chatgpt-launched-six-months-ago-its-impact-and-fallout-is-just-beginning-the-ai-beat/' 
    },
    {
        key: 5,
        image: 'https://media.karousell.com/media/photos/products/2023/2/8/andrew_tate__the_real_world202_1675846651_441b8100_progressive',
        name:'The Real World', 
        description: 'In modern day all colleges are mere fakes. They teach you how to remain poor. Join the Real World now to learn from verified millionaires.',
        ratings: '4.1',
        first_name: 'Troll Tate', 
        link: 'https://www.therlworld.com/' 
    },
    {
        key: 6,
        image: 'https://images.idgesg.net/images/article/2019/05/java_binary_code_gears_programming_coding_development_by_bluebay2014_gettyimages-1040871468_2400x1600-100795798-large.jpg?auto=webp&quality=85,70',
        name:'Java aka Headache', 
        description: 'Java began life as an alternative to the conventional way of doing things—an upstart of sorts. Despite repeated challenges, it is recognized as a pillar of enterprise software.',
        ratings: '2.8',
        first_name: 'Java Keeper', 
        link: 'https://www.infoworld.com/article/3666525/7-reasons-java-is-still-great.html' 
    },
    {
        key: 7,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Raspberry_Pi_4_Model_B_-_Side.jpg/1024px-Raspberry_Pi_4_Model_B_-_Side.jpg',
        name:'Raspberry Pi - Ease it Out', 
        description: 'The Raspberry Pi is a low cost, credit-card sized computer that plugs into a computer monitor or TV, and uses a standard keyboard and mouse.',
        ratings: '4.8',
        first_name: 'Gagan Chupa', 
        link: 'https://www.simplilearn.com/tutorials/nodejs-tutorial/what-is-nodejs' 
    },
    {
        key: 8,
        image: 'https://www.arenaparkstreet.com/blog/wp-content/uploads/2021/05/Game-Development.png',
        name:'Find the Gamer in you', 
        description: 'There is a gamer in all of us whether you play on your smartphone, or a computer. Every finest gamer who is fond of coding dreams of creating their own video game.',
        ratings: '4',
        first_name: 'Legion 20', 
        link: 'https://www.arenaparkstreet.com/blog/how-can-i-start-to-learn-game-development/' 
    },
]

// Export the array of fake card data as the default export
export default CardData;