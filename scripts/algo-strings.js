/* -- ALGORITHM NAMES -- */
const algoNames = ['Pencil-and-Paper Method', 'Booth\'s Algorithm', 'Extended Booth\'s Algorithm'];

/* --- TRIVIA HEADER --- */
const pencilTriviaHeader = '. ';
const boothsTriviaHeader = '. ';
const extendedBoothsTriviaHeader = 'Triple Treat. ';

const triviaHeaders = [pencilTriviaHeader, boothsTriviaHeader, extendedBoothsTriviaHeader];

/* --- TRIVIA --- */
const pencilTrivia = 
    ``;

const boothsTrivia = 
    ``;

const extendedBoothsTrivia = 
    `In 2008, an extension of Booth's algorithm for multiplying three operands on field-programmable gate arrays (FPGAs) 
    was proposed by Israeli researchers Y. Ben Asher and E. Stein&nbsp; 
    <a class = "no-decor no-hover trivia" href = "https://ieeexplore.ieee.org/document/4762411" target = "_blank">
    <i class = "fa fa-external-link no-hover"></i></a>`

const trivia = [pencilTrivia, boothsTrivia, extendedBoothsTrivia];

const pencilAlgo = 
    ``;
const boothsAlgo = 
    ``;

/* --- EXTENDED BOOTH'S ALGORITHM --- */
const extendedBoothsIntro = 
    `Introduced by O.L. MacSorley in 1961 
    <a class = "no-decor no-hover trivia" href = "https://ieeexplore.ieee.org/document/4066249" target = "_blank">
    <i class = "fa fa-external-link no-hover"></i></a>
    and given a streamlined proof by L.P. Rubinfield in 1975 
    <a class = "no-decor no-hover trivia" href = "https://ieeexplore.ieee.org/document/1672707" target = "_blank">
    <i class = "fa fa-external-link no-hover"></i></a>, 
    this technique, which is also known as <b>bit-pair recoding</b>,
    reduces the number of intermediate summands by half. <br> <br>`;

const extendedBoothsStepA =
    `<b>A. &nbsp; Represent the operands in two's complement.</b> <br>
        <span class = "indented">
            1. &nbsp; If the user enters a decimal number, it is represented using the fewest number of bits.
        </span><br>
        <span class = "indented">
            2. &nbsp; If the user enters a binary number, the number of bits follows the user's input. 
        </span><br>`;

const extendedBoothsStepB =
    `<b>B. &nbsp; If necessary, perform sign extension to make the number of bits of the operands equal.</b> <br>`;

const extendedBoothsStepC = 
    `<b>C. &nbsp; Convert the multiplier to its extended Booth's equivalent.</b><br>
        <span class = "indented">
            1. &nbsp; Append 0 to the least significant bit.
        </span><br>
        <span class = "indented">
            2. &nbsp; If the multiplier has an odd number of bits (prior to appending 0), perform sign extension.
        </span> <br>
        <span class = "indented">
            3. &nbsp; Perform bit-pair recoding starting at the least significant bit.
        </span>`;

const extendedBoothsStepCTable =
    `<table class = "indented-2 procedure merged">
        <tr>
            <th rowspan = "2"><em>b</em><sub>2</sub><em>b</em><sub>1</sub><em>b</em><sub>0</sub></th>  
            <th rowspan = "2">Recoding<sub></sub></th>
            <th colspan = "3">Mnemonic<sub></sub></th>
        </tr>
        <tr>
            <td>Booth's of <em>b</em><sub>2</sub><em>b</em><sub>1</sub></td>
            <td>Booth's of <em>b</em><sub>1</sub><em>b</em><sub>0</sub></td>
            <td>Derivation<sub></sub></td>
        </tr>
        <tr>
            <td><b>000</b></td>
            <td><b>0</b></td>
            <td>0</td>
            <td>0</td>
            <td>0 &times; 2 + 0 </td>
        </tr>
        <tr>
            <td><b>001</b></td>
            <td><b>+1</b></td>
            <td>0</td>
            <td>+1</td>
            <td>0 &times; 2 + 1 </td>
        </tr>
        <tr>
            <td><b>010</b></td>
            <td><b>+1</b></td>
            <td>+1</td>
            <td>-1</td>
            <td>+1 &times; 2 -1 </td>
        </tr>
        <tr>
            <td><b>011</b></td>
            <td><b>+2</b></td>
            <td>+1</td>
            <td>0</td>
            <td>+1 &times; 2 + 0 </td>
        </tr>
        <tr>
            <td><b>100</b></td>
            <td><b>-2</b></td>
            <td>-1</td>
            <td>0</td>
            <td>-1 &times; 2 + 0 </td>
        </tr>
        <tr>
            <td><b>101</b></td>
            <td><b>-1</b></td>
            <td>-1</td>
            <td>+1</td>
            <td>-1 &times; 2 + 1 </td>
        </tr>
        <tr>
            <td><b>110</b></td>
            <td><b>-1</b></td>
            <td>0</td>
            <td>-1</td>
            <td>0 &times; 2 - 1 </td>
        </tr>
        <tr>
            <td><b>111</b></td>
            <td><b>0</b></td>
            <td>0</td>
            <td>0</td>
            <td>0 &times; 2 + 0 </td>
        </tr>
    </table>`;

const extendedBoothsStepD = 
    `<b>D. &nbsp; Multiply using pencil-and-paper method &mdash; but ignore the extra step even if the multiplier 
        is negative. <br>
        <span>
            &nbsp;&nbsp; &nbsp; &nbsp; Since a bit-pair is equivalent to two bits, skip <u>two</u> bits for each 
            intermediate product.</b>
        </span><br>`;

const extendedBoothsStepDTable = 
    `<table class = "indented-2 procedure">
        <tr>
            <th>Multiply by</th>
            <th>Procedure</th>
        </tr>
        <tr>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>+1</td>
            <td>Itself</td>
        </tr>
        <tr>
            <td>-1</td>
            <td>Two's complement</td>
        </tr>
        <tr>
            <td>+2</td>
            <td>Left arithmetic shift (append 0 to the least significant bit)</td>
        </tr>
        <tr>
            <td>-2</td>
            <td>Two's complement, then left arithmetic shift</td>
        </tr>
    </table>`;

const extendedBoothsAlgo = 
    `${extendedBoothsIntro}
    ${extendedBoothsStepA}
    ${extendedBoothsStepB}
    ${extendedBoothsStepC}
    ${extendedBoothsStepCTable}
    ${extendedBoothsStepD}
    ${extendedBoothsStepDTable}`;

const algoSteps = [pencilAlgo, boothsAlgo, extendedBoothsAlgo];