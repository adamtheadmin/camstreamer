### Camstreamer

#### Intruduction

I made this repo to simply stream a video from a webcam connected to my raspberry pi over an HTTP Protocol. 
This software handles that, and supports both browsers and mobile via VLC.

#### System Requirements

- MacOS or Linux
- FFmpeg
- Node JS
- A Webcam
- Recommended: Nginx setup with basic auth

#### Setup

- Install on Linux

    - Install FFMPEG, usually either `pacman -S ffmpeg` or `sudo apt-get install ffmpeg`
    - Clone This Repository and `cd` into the repository
    - run `npm i`
    - run `npm i -g typescript ts-node` to install typescript and ts-node
    - finally run `sudo npm run install-systemd` This will install a systemd script to launch this app when your PI or computer turns on.
    - The setup process will ask some questions about the service name and port you want to run this on
    - Lastly, you should use nginx to proxy your camera connection and add basic auth.


- Test on MacOS

  - Install Brew, then run `brew install ffmpeg` to install FFmpeg.
  - Clone This Repository and `cd` into the repository
  - run `npm i`
  - run `npm i -g typescript ts-node` to install typescript and ts-node
  - run `npm run dev` to test.

#### Todo:
  - Fix streaming issue so multiple users can share the same stream
  - Add windows support

If you would like to contribute, feel free to open a PR. 
  

#### Licence

Copyright 2022 ADAM FOWLER

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
