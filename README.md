Lucky Draw with Google Sheets support
==========
A simple lucky draw machine.

Demo on Vimeo: [Watch](https://vimeo.com/103432954)

##Feature
- Support loading participants from Google Sheets using shareable link (See https://support.google.com/docs/answer/2494822?co=GENIE.Platform%3DDesktop&hl=en).  The machine will load the values from Column A
- Support viewing the machine working from multiple devices at the same time
- Support mobile display and control
- Christmas theme

##How to install Lucky Draw?

1. Install Node.js: http://nodejs.org/
2. Locate to the folder "lucky-draw/App" and execute the command: 

   - On Mac, run <code>sudo npm install</code>
   - On Windows, run <code>npm install</code>
    
3. Locate to the folder "lucky-draw/App", 

   - On Mac, run <code>sudo npm start</code>
   - On Windows, run <code>npm start</code>

4. Configure a Google Sheet API Key in /App/conf.js  
(See https://cloud.google.com/docs/authentication/api-keys)

5. Open your browser and visit <code>http://localhost:3000</code>

Good luck :D
