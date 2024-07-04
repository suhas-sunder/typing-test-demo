# Free Typing Camp - A Full-Stack Typing Test Web Application    

This is a full-stack application that is [currently hosted live](https://freetypingcamp.com) on Digital Ocean. 
  - It is a personal project I have been building for fun in my spare time, however, the project is not yet complete.
  - Some pages are unfinished, however, some features such as the typing test on the home page are fully functional.
  - It is built using React, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL and more.
  - I have implemented a [guest login page](https://freetypingcamp.com/login) for anyone interested in exploring the features of this application without having to create an account.
    
  <div align="center">

<img width="410" alt="image" src="https://github.com/suhas-sunder/typing-test-app/assets/77464593/5a2d59da-efd0-43bc-ad20-be2b41399171">

  </div>


# Project Overview:

Built an interactive, user-friendly full-stack web application using React, TypeScript, Tailwind CSS, PostgreSQL, Node, and Express, enabling users to improve typing skills through an interactive, gamified learning experience.
Hosted the web application on Digital Ocean, tracked user engagement through Google Analytics, and optimized security, performance, and reliability using Cloudflare, including SSL implementation and R2 API for file storage.
Implemented secure login/authentication with JSON Web Token, configured CORS and other essential back-end middleware, and conducted comprehensive unit and integration testing using Vitest for back-end security.
Utilized Adobe Firefly AI and Chat GPT to programmatically generate image and JSON text content for the website.

# Project Challenges:

Initially, I encountered an issue where loading too many characters at once caused the application to crash. To resolve this, I implemented a solution to limit the amount of text rendered within the text area.

Another challenge was hiding lines of text when the user completed typing more than two lines or showing hidden lines of text when user held the delete key. Initially, I attempted to estimate the width of each character using the Roboto font but encountered discrepancies due to rounding errors. To address this, I switched to a Monotype font and assigned a fixed width to each character, ensuring consistent line lengths and facilitating the addition or removal of lines based on user input.

However, creating a responsive design without compromising the existing logic was another hurdle. I had to calculate the maximum length of each line based on the current screen width, dynamically adjusting the displayed text to maintain a maximum of two lines while accommodating varying screen sizes. This involved recalculating line lengths whenever the screen size changed to ensure the interface remained functional across different devices and resolutions.

I encountered an issue where users could exploit the system by holding down a key, such as the space bar, to achieve a high score without completing the test properly. Initially, I considered implementing a modal pop-up to disqualify the test and prompt a reset when a user held any key for too long. However, I found this approach intrusive and detrimental to the user experience.

Instead, I opted to listen to every key input and programmed the system to reject input, except for backspace, once a long keydown event was detected until a keyup event occurred. While this approach partially addressed the issue, it introduced a minor lag that affected the accuracy of user input, resulting in an unfair test experience.

After exploring various solutions, I discovered that comparing the held keydown input to the last keyup input effectively prevented users from holding down keys while allowing normal typing behavior. This adjustment restored the test's functionality and prevented users from exploiting the system.

Throughout the project, I encountered numerous challenges that required meticulous attention to detail and innovative problem-solving. Despite the app's seemingly simple appearance, it presented a myriad of complexities that significantly enhanced my problem-solving and programming skills. From creating a real-world application hosted live to implementing features such as manipulating text according to test difficulty presets, score tracking, and serving media and JSON files via Cloudflare R2 API, these experiences have broadened my technical capabilities and deepened my understanding of the fundamentals of programming, the nuances of using React and related technologies, user-centric design, and software development best practices.

The images on this site were created using the Adobe Firefly AI and polished/edited using Adobe Express and Photoshop. The text content used for the typing tests are generated using Chat GPT 4. Adobe Illustrator was used to create some SVG's such as the logo for the website.

# Home Page

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/6bf27b86-4bf5-4f4a-a3e5-b4afd396c5d0)


# Home Page (Logged in)

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/a6d1a5e4-e824-4b37-aa25-ca705d7df098)


# Typing Test

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/19030e73-16c9-4e98-9a61-f3af1caf94b6)


# Difficulty Settings & Points breakdown for tests

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/2b7f47b5-0cb1-4ecb-a225-1782caa51e8a)


Custom difficulty options

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/06b24392-7815-4d09-aad8-ce2dd5dba99b)


# Typing Test after applying difficulty settings

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/7b80fadc-40c3-4e30-85cd-f0ffcc01b596)


# Game over summary

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/4228c092-2f60-490c-b6bd-2858dbc71371)


# Login & Registration Forms

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/7858d82d-d5a1-4bb7-8fba-62b931e0f26d)


# Profile Dashboard 

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/14a61295-3a85-46d5-a614-bfc7cc30006c)

# Select profile image from a list of options (Images pooled via Cloudflare R2 and managed app wide using Context API)
![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/7334aa95-22eb-4bad-97b0-631071d753e6)

# Games menu
![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/19abeec4-f587-43f9-8b62-27043d8ca271)

#Typing Game
![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/e6a5e9a6-4fff-4108-a397-e41091d4efc7)

# This website follows best pracices for web safety and is optimized for for performance, accessability, and SEO:

<img  width="1367" alt="image" src="https://github.com/suhas-sunder/typing-test-app/assets/77464593/92426ea1-006c-41dd-b9e1-ae94e6d4f1d0">

# The same is true for the mobile version:

<img className="flex w-full items-center justify-center" width="1379" alt="image" src="https://github.com/suhas-sunder/typing-test-app/assets/77464593/0585d6c8-94c1-4562-b384-48c487fbc15a"/>

# Mobile Responsive Design:

<div align="center">
  
![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/7ad63b21-ec14-45a4-92df-f254184aca45)

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/f8125b7e-f4d4-4e36-8019-6c3fd76c82a5)

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/68827691-b988-4df5-9d64-ee2a2113bba6)

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/5a0c05be-0bee-4a5a-bd7b-686ca6b376ff)

![image](https://github.com/suhas-sunder/typing-test-app/assets/77464593/6c4c79b1-aa70-4985-beb9-660c855d033d)
</div>

