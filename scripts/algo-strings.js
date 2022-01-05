/**
 * File containing the strings (literal constants) used in the website.
 *
 * For horizontal spacing, use the .tab-n (where n is a natural number) classes found in style.css,
 * as seen in the strings related to the extended Booth's algorithm. Avoid using consecutive &nbsp;
 * since these clutter the text included when the user performs a selection.
 */

/* --- ALGORITHM NAMES --- */
const algoNames = [
	`Pencil-and-Paper Method`,
	`Booth's Algorithm`,
	`Extended Booth's Algorithm`
];

/* --- TRIVIA HEADER --- */
/* End with a period (or any other terminal punctuation mark), followed by a space. */
const pencilTriviaHeader = '. ';
const boothsTriviaHeader = '. ';
const extendedBoothsTriviaHeader = 'Triple Treat. ';

const triviaHeaders = [
	pencilTriviaHeader,
	boothsTriviaHeader,
	extendedBoothsTriviaHeader
];

/* --- TRIVIA --- */
const pencilTrivia = ``;

const boothsTrivia = ``;

const extendedBoothsTrivia = `In 2008, an extension of Booth's algorithm for multiplying three operands on field-programmable gate arrays (FPGAs) 
    was proposed by Israeli researchers Y. Ben Asher and E. Stein&nbsp; 
    <a class = "no-decor no-hover trivia" href = "https://ieeexplore.ieee.org/document/4762411" target = "_blank">
    <i class = "fa fa-external-link no-hover"></i></a>`;

const trivia = [pencilTrivia, boothsTrivia, extendedBoothsTrivia];

/* --- PENCIL-AND-PAPER ALGORITHM --- */
const pencilAlgo = ``;

/* --- BOOTH'S ALGORITHM --- */
const boothsAlgo = ``;

/* --- EXTENDED BOOTH'S ALGORITHM --- */
const extendedBoothsIntro = `Introduced by O.L. MacSorley in 1961 
    <a class = "no-decor no-hover trivia" href = "https://ieeexplore.ieee.org/document/4066249" target = "_blank">
    <i class = "fa fa-external-link no-hover"></i></a>
    and given a streamlined proof by L.P. Rubinfield in 1975 
    <a class = "no-decor no-hover trivia" href = "https://ieeexplore.ieee.org/document/1672707" target = "_blank">
    <i class = "fa fa-external-link no-hover"></i></a>, 
    this technique, which is also known as <b>modified Booth's algorithm</b>, <b>radix-4 Booth's algorithm</b>, or 
    <b>bit-pair recoding</b>, reduces the number of intermediate summands by half. <br> <br>`;

const extendedBoothsStepA = `<b>A.<span class="tab-13"></span>Represent the operands in two's complement.</b> <br>
        <span class = "indented">
            1.<span class="tab-13"></span>If the user enters a decimal number, it is represented using the fewest number of bits.
        </span><br>
        <span class = "indented">
            2.<span class="tab-13"></span>If the user enters a binary number, the number of bits follows the user's input. 
        </span><br>`;

const extendedBoothsStepB = `<b>B.<span class="tab-13"></span>If necessary, perform sign extension to make the number of bits of the operands equal.</b> <br>`;

const extendedBoothsStepC0 = `<b>C.<span class="tab-13"></span>Convert the multiplier to its extended Booth's equivalent.</b><br>`;

const extendedBoothsStepC1 = `<span class = "indented">
        1.<span class="tab-13"></span>Append 0 to the least significant bit.
    </span><br>`;

const extendedBoothsStepC2 = `<span class = "indented">
        2.<span class="tab-13"></span>If the multiplier has an odd number of bits (prior to appending 0), perform sign extension.
    </span><br>`;

const extendedBoothsStepC3 = `<span class = "indented">
        3.<span class="tab-13"></span>Perform bit-pair recoding starting at the least significant bit.
    </span>`;

const extendedBoothsStepC = `${extendedBoothsStepC0}
    ${extendedBoothsStepC1}
    ${extendedBoothsStepC2}
    ${extendedBoothsStepC3}`;

const extendedBoothsStepCShowTable = `<br><span class = "indented">
        <span class="tab-27"></span>Click <a onclick = "showExtendedBoothsRecoding(); scrollToExtendedBoothsRecoding();" class = "with-underline no-decor no-hover" id = "show-extended-booths-recording">here</a> 
        to <span id = "show-hide-extended-booths-recoding">show</span> the recoding table.
    </span>`;

const extendedBoothsStepCTableProvision = `<span id = "extended-booths-step-c-table-provision"></span>`;

const extendedBoothsStepCTable = `<table class = "indented-2 procedure merged">
        <tr>
            <th rowspan = "2">b<sub>i+1</sub> b<sub>i</sub> b<sub>i-1</sub></th>  
            <th rowspan = "2">Recoding<sub></sub></th>
            <th colspan = "3">Mnemonic<sub></sub></th>
        </tr>
        <tr>
            <td>Booth's of b<sub>i+1</sub> b<sub>i</sub></td>
            <td>Booth's of b<sub>i</sub> b<sub>i-1</sub></td>
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
            <td>+1 &times; 2 - 1 </td>
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

const extendedBoothsStepD = `<b>D.<span class="tab-13"></span>Multiply using pencil-and-paper method &mdash; but ignore the extra step even if the multiplier 
        is negative. <br>
        <span>
        <span class="tab-29"></span> Since a bit-pair is equivalent to two bits, skip <u>two</u> bits for each 
            intermediate product.</b>
        </span><br>`;

const extendedBoothsStepDShowTable = `<span style = "margin-top: 10px;">
        <span class="tab-29"></span>Click <a onclick = "showExtendedBoothsOperations(); scrollToExtendedBoothsOperations();" class = "with-underline no-decor no-hover" id = "show-extended-booths-recording">here</a> 
            to <span id = "show-hide-extended-booths-operations">show</span> the multiplication guide.
        </span>`;

const extendedBoothsStepDTableProvision = `<span id = "extended-booths-step-d-table-provision"></span>`;

const extendedBoothsStepDTable = `<table class = "indented-2 procedure">
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
            <td>Arithmetic left shift (append 0 to the least significant bit)</td>
        </tr>
        <tr>
            <td>-2</td>
            <td>Two's complement, then arithmetic left shift</td>
        </tr>
    </table>`;

const extendedBoothsPicture = `<br><div class = "div-picture">
        <img src = "assets/ibm-extended-booths.jpg" class = "picture">
        <span class = "tab-13"></span>
        <img src = "assets/ibm-extended-booths-2.jpg" class = "picture">
        <br>
        <div class = "picture-caption">
            To perform fast multiplication, the <b>IBM System/360 Model 91</b>, released in January 1966 and used
            at the NASA Goddard Space Flight Center back in the late 60s,  employed the extended Booth's algorithm and utilized 
            a tree of carry-save adders. More information on its implementation can be found 
            in a 1967 paper by S.F. Anderson, J.G. Earle, R.E. Goldschmidt, and D.M. Powers&nbsp;
            <a class = "no-decor no-hover trivia" href = "https://ieeexplore.ieee.org/document/5392016" target = "_blank">
            <i class = "fa fa-external-link no-hover"></i></a>
        </div>
    </div><br>`;

const extendedBoothsAlgo = `${extendedBoothsIntro}
    ${extendedBoothsStepA}
    ${extendedBoothsStepB}
    ${extendedBoothsStepC}
    ${extendedBoothsStepCTable}
    ${extendedBoothsStepD}
    ${extendedBoothsStepDTable}
    ${extendedBoothsPicture}`;

const algoSteps = [pencilAlgo, boothsAlgo, extendedBoothsAlgo];

/* Verification step at the end of every multiplication algorithm demonstration (simulation) */
const verify = `<span class = "material-icons">check_circle_outline</span><span class = "tab-13"></span><b><u>Verification</u>:</b>`;
