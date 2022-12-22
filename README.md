# Binary Multiplication Simulator

![badge][badge-html5]
![badge][badge-js]
![badge][badge-jquery]
![badge][badge-prettier]
![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=binary-multiply)

This project is an interactive website for demonstrating or simulating **signed binary multiplication** via three methods:

-   Pencil-and-paper method
-   Booth's algorithm
-   Extended Booth's algorithm (also known as *modified Booth's algorithm*, *radix-4 Booth's algorithm*, or *bit-pair recoding*)

This website is a major course output in a computer organization and architecture class. The following are its key features:

-   Support for both decimal and binary number input, up to a maximum of 16 bits (minimum: &ndash;2<sup>15</sup> = &ndash;32768, maximum: 2<sup>15</sup> &ndash; 1 = 32767)
-   Option to switch between demonstrating each step one at a time and displaying all the steps at once
-   Playback controls for navigating through the step-by-step demonstration
-   Exporting of step-by-step demonstration to a text file

💡 **UPDATE (12/22/2022): With the shutting down of free Heroku services, we have migrated to Vercel: https://binary-multiply.vercel.app/**

## Project Structure

This project consists of the following folders:

| Folder                                                                                | Description                   |
| ------------------------------------------------------------------------------------- | ----------------------------- |
| [`assets`](https://github.com/memgonzales/binary-multiplication/tree/master/assets)   | Contains the image files      |
| [`scripts`](https://github.com/memgonzales/binary-multiplication/tree/master/scripts) | Contains the JavaScript files |
| [`style`](https://github.com/memgonzales/binary-multiplication/tree/master/style)     | Contains the CSS style sheets |

It also includes the following files:

| File                                                                                              | Description                                                 |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [`composer.json`](https://github.com/memgonzales/binary-multiplication/blob/master/composer.json) | Contains the list of dependencies of the PHP project        |
| [`Procfile`](https://github.com/memgonzales/binary-multiplication/blob/master/Procfile)           | Specifies the commands run by the project's dynos on Heroku |
| [`index.html`](https://github.com/memgonzales/binary-multiplication/blob/master/home.html)        | Home (main) page of the website                             |
| [`index.php`](https://github.com/memgonzales/binary-multiplication/blob/master/index.php)         | Entry point of the PHP project                              |

## Running the Simulator

### User Manual

For detailed instructions on how to use this simulator, you may refer to our [user manual](https://github.com/memgonzales/binary-multiplication/blob/master/User%20Manual.pdf). 

### Running on the Web

Open the following website: https://binary-multiply.vercel.app/

### Running Locally

1. Create a copy of this repository:

    - If [git](https://git-scm.com/downloads) is installed, type the following command on the terminal:

        ```
        git clone https://github.com/memgonzales/binary-multiplication
        ```

    - If git is not installed, click the green `Code` button near the top right of the repository and choose [`Download ZIP`](https://github.com/memgonzales/binary-multiplication/archive/refs/heads/master.zip). Once the zipped folder has been downloaded, extract its contents.

2. Open [`index.html`](https://github.com/memgonzales/binary-multiplication/blob/master/index.html).

    - There is no need to install any additional software or dependency. However, internet connection is required to load fonts, libraries, and toolkits from their respective content delivery networks (CDNs).

<br>

   <img src="https://github.com/memgonzales/binary-multiplication/blob/master/screenshots/screenshot1.PNG?raw=True" alt="Pencil-and-paper method" width = 750> <br>
   
   <img src="https://github.com/memgonzales/binary-multiplication/blob/master/screenshots/screenshot2.PNG?raw=True" alt="Extended booth's algorithm" width = 750> <br>
   
   <img src="https://github.com/memgonzales/binary-multiplication/blob/master/screenshots/screenshot3.PNG?raw=True" alt="Booth's algorithm" width = 750> <br>


## Built Using

This project uses **JavaScript** to carry out all the operations and computations on the client-side. Additional libraries and toolkits are enumerated in the following table:

| Library/Toolkit                                                            | Version | Description                                                                                                                  | License                                                                        |
| -------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [jQuery](https://jquery.com/)                                              | 3.5.1   | Fast, small, and feature-rich JavaScript library for HTML document traversal and manipulation, event handling, and animation | MIT License                                                                    |
| [Font Awesome](https://fontawesome.com/)                                   | 4.7.0   | Front-end toolkit featuring vector icons and social logos                                                                    | CC BY 4.0 License (Icons)<br>SIL OFL 1.1 License (Fonts)<br>MIT License (Code) |
| [Google Fonts](https://fonts.google.com/)                                  | -       | Font embedding service library featuring free and open-source fonts                                                          | Apache License 2.0                                                             |
| [Material Design](https://developers.google.com/fonts/docs/material_icons) | -       | Library for the design system developed by Google for Android, iOS, Flutter, and the web                                     | Apache License 2.0                                                             |

_The descriptions of these technologies are taken from their respective websites._

The opinionated code formatter [Prettier](https://prettier.io/) was employed to enforce uniformity and consistency of coding style.

The website was refactored into a PHP application for faster and lightweight deployment on [Heroku](https://dashboard.heroku.com/), a cloud platform as a service (PaaS).

💡 **UPDATE (12/22/2022):** With the shutting down of free Heroku services, we have migrated to [Vercel](https://vercel.com/), another cloud PaaS.

## Authors

-   <b>Lander Peter E. Cua</b> <br/>
    lander_peter_cua@dlsu.edu.ph <br/>
    landercua@gmail.com <br/>
-   <b>Jacob Bryan B. Gaba</b> <br/>
    jacob_bryan_gaba@dlsu.edu.ph <br/>
    jacob.gaba20@gmail.com <br/>
-   <b>Mark Edward M. Gonzales</b> <br/>
    mark_gonzales@dlsu.edu.ph <br/>
    gonzales.markedward@gmail.com <br/>
-   <b>Hylene Jules G. Lee</b> <br/>
    hylene_jules_lee@dlsu.edu.ph <br/>
    lee.hylene@gmail.com

Assets (images) are properties of their respective owners. Attribution is found in the [credits](https://github.com/memgonzales/binary-multiplication/blob/master/CREDITS.md) file.

[badge-html5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white
[badge-js]: https://img.shields.io/badge/javascript-%23323330.svg?style=flate&logo=javascript&logoColor=%23F7DF1E
[badge-jquery]: https://img.shields.io/badge/jquery-%230769AD.svg?style=flat&logo=jquery&logoColor=white
[badge-php]: https://img.shields.io/badge/PHP-777BB4?style=flate&logo=php&logoColor=white
[badge-prettier]: https://img.shields.io/badge/prettier-1A2C34?style=flat&logo=prettier&logoColor=F7BA3E
[badge-heroku]: https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white
