# Playlist Persona
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Table of Contents
- [Description](#description)
- [Installation](#installation-instructions)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)
- [Tests](#tests)
- [Questions](#questions)

## Deployed Application
https://test-deploy-ivka.onrender.com/

## Description
**Playlist Persona** is a personalized playlist generator that uses OpenAI and YouTube APIs to create music playlists tailored to your mood and preferences. With a few prompts, Playlist Persona crafts a unique playlist experience, catering to whatever vibe you're in the mood for.

## Installation Instructions
1. Clone the repository:
```bash
https://github.com/jkupi/Playlist_persona_offical_deploy
```
2. Navigate to the project directory
3. Install dependencies
```bash
npm install
```
4. Set up the environment variables for OpenAI and YouTube APIs:
    - Create .env in the root directory
    - Add your API keys:
    ```bash
    OPENAI_API_KEY=your_openai_api_key
    YOUTUBE_API_KEY=your_youtube_api_key
    DB_USER=your_db_username
    DB_NAME=your_db_name
    DB_PASSWORD=your_db_password
    JWT_SECRET_KEY=your_jwt_secret_key
    ```

## Usage
1. Run the app
```bash
npm start
```
2. Answer the generated questions regarding your mood, preferred music genre, and type of artists you want to hear based on popularity.
3. Playlist Persona will generate a personalized playlist based on your input.
4. Listen to the songs on the generated playlist page via the imbedded YouTube videos.
5. Save generated playlist to your profile to listen to or delete later.

## License 
MIT

## Credits
- Maher AboulHosn - Primary development, **database and authentication implementation**
- Jaakob Alakulppi - Primary development, **API calls and backend functionality**
- Ike Byers - Primary development, **front-end design and UI logic/functionality**

**Sources**
- Stack Overflow (for general typescript, json, vite, database, and routing inquiries)
- YouTube API Documentation (for calls made to YouTube API)
- OpenAI API Documentation (for calls made to OpenAI API)
- JWT documentation (for authentication)
- Sequelize documentation (for database)
- Boostrap documentation (for styling and front-end design)
- CORS documentation (for cross origin functionality)
- Render documentation (for application deployment)
- Xpert Learning Assistant (for debugging code and suggestions)

## Questions
If you have any questions, please contact us at:
- GitHub: 
    - [ikebyers](https://github.com/ikebyers)
    - [jkupi](https://github.com/jkupi)
    - [maherhosn](https://github.com/maherhosn)
- Email: 
    - ikebyersmgmt@gmail.com
    - jbalakulppi@gmail.com
    - maherhosn@hotmail.com
