# Binary Multiplication

This project is an interactive website for demonstrating or simulating **signed binary multiplication** via three methods:

-   **Pencil-and-paper method**
-   **Booth's algorithm**
-   **Extended Booth's algorithm** (also known as **modified Booth's algorithm**, **radix-4 Booth's algorithm**, or **bit-pair recoding**)

This website is a major course output in a computer organization and architecture class. The following are its key features:

-   Support for both **decimal and binary number input**, up to a maximum of 16 bits (minimum: &ndash;2<sup>15</sup> = &ndash;32768, maximum: 2<sup>15</sup> &ndash; 1 = 32767)
-   Option to switch between **demonstrating each step one at a time** and **displaying all the steps at once**
-   **Playback controls** for navigating through the step-by-step demonstration
-   Exporting of step-by-step demonstration to a **text file**

**_The deployed website can be accessed through this link: [INSERT LINK HERE]_**

## Project Structure

This project consists of the following folders:

| Folder                                                                                | Description                   |
| ------------------------------------------------------------------------------------- | ----------------------------- |
| [`assets`](https://github.com/memgonzales/binary-multiplication/tree/master/assets)   | Contains the image files      |
| [`scripts`](https://github.com/memgonzales/binary-multiplication/tree/master/scripts) | Contains the JavaScript files |
| [`style`](https://github.com/memgonzales/binary-multiplication/tree/master/style)     | Contains the CSS style sheets |

It also includes the following files:

| File                                                                                              | Description                                          |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [`composer.json`](https://github.com/memgonzales/binary-multiplication/blob/master/composer.json) | Contains the list of dependencies of the PHP project |
| [`home.html`](https://github.com/memgonzales/binary-multiplication/blob/master/home.html)         | Home (main) page of the website                      |
| [`index.php`](https://github.com/memgonzales/binary-multiplication/blob/master/index.php)         | Entry point of the PHP project                       |

## Running the Website

### Running on the Web

Open the following website: [INSERT LINK HERE]

### Running Locally

1. Create a copy of this repository:

    - If [git](https://git-scm.com/downloads) is installed, type the following command on the terminal:

        ```
        git clone https://github.com/memgonzales/binary-multiplication
        ```

    - If git is not installed, click the green <code>Code</code> button near the top right of the repository and choose <code>Download ZIP</code>. Once the zipped folder has been downloaded, extract its contents.

2. Open [`home.html`](https://github.com/memgonzales/binary-multiplication/blob/master/home.html).

    - There is no need to install any additional software or dependency. However, internet connection is required to load fonts, libraries, and toolkits from their respective content delivery networks (CDNs).

3. [INSERT PORTION ON USER MANUAL]

## Built Using

This project uses **JavaScript** to carry out all the operations and computations on the client-side. Additional libraries and toolkits are enumerated in the following table:

| Library/Toolkit                           | Version | Description                                                                                                                  | License                                                                        |
| ----------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [jQuery](https://jquery.com/)             | 3.5.1   | Fast, small, and feature-rich JavaScript library for HTML document traversal and manipulation, event handling, and animation | MIT License                                                                    |
| [Font Awesome](https://fontawesome.com/)  | 4.7.0   | Front-end toolkit featuring vector icons and social logos                                                                    | CC BY 4.0 License (Icons)<br>SIL OFL 1.1 License (Fonts)<br>MIT License (Code) |
| [Google Fonts](https://fonts.google.com/) | -       | Font embedding service library featuring free and open-source fonts                                                          | Apache License 2.0                                                             |

The opinionated code formatter [Prettier](https://prettier.io/) was employed to enforce uniformity and consistency of coding style.

The website was refactored into a [PHP](https://www.php.net/) project for faster and lightweight deployment on [Heroku](https://dashboard.heroku.com/), a cloud platform as a service (PaaS).

## Authors

-   <b>Lander Peter E. Cua</b> <br/>
    lander_peter_cua@dlsu.edu.ph <br/>
-   <b>Jacob Bryan B. Gaba</b> <br/>
    jacob_bryan_gaba@dlsu.edu.ph <br/>
-   <b>Mark Edward M. Gonzales</b> <br/>
    mark_gonzales@dlsu.edu.ph <br/>
    gonzales.markedward@gmail.com <br/>
-   <b>Hylene Jules G. Lee</b> <br/>
    hylene_jules_lee@dlsu.edu.ph <br/>
    lee.hylene@gmail.com

Assets (images) are properties of their respective owners. Attribution is found in the [credits](https://github.com/memgonzales/binary-multiplication/blob/master/CREDITS.md) file and displayed publicly on the [INSERT PAGE HERE].
