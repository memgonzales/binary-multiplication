/**
 * File containing the strings (literal constants) used in the website.
 *
 * For horizontal spacing, use the .tab-n (where n is a natural number) classes found in style.css,
 * as seen in the strings related to the extended Booth's algorithm. Avoid using consecutive &nbsp;
 * since these clutter the text included when the user performs a selection.
 */

/* --- ALGORITHM NAMES --- */
const algoNames = [`Pencil-and-Paper Method`, `Booth's Algorithm`, `Extended Booth's Algorithm`];

/* --- TRIVIA HEADER --- */
/* End with a period (or any other terminal punctuation mark), followed by a space. */
const pencilTriviaHeader = 'Are We There Yet? ';
const boothsTriviaHeader = '. ';
const extendedBoothsTriviaHeader = 'Triple Treat. ';

const triviaHeaders = [pencilTriviaHeader, boothsTriviaHeader, extendedBoothsTriviaHeader];

/* --- TRIVIA --- */
const pencilTrivia = `Hardware implementations optimize the paper-and-pencil method by adding multiple partial products together in
    a single cycle, such as Wallace trees&nbsp; 
    <a class = "no-decor no-hover trivia" href = "https://uma.ac.ir/files/site1/g_zare_3fd00a8/a_suggestion_for_a_fast_multiplier.pdf" target = "_blank">
    <i class = "fa fa-external-link no-hover"></i></a> and Dadda multipliers&nbsp; 
    <a class = "no-decor no-hover trivia" href = "https://www.ece.ucdavis.edu/~vojin/CLASSES/EEC280/Web-page/papers/Arithmetic/Dadda_mult.pdf" target = "_blank">
    <i class = "fa fa-external-link no-hover"></i></a>`;

const boothsTrivia = ``;

const extendedBoothsTrivia = `In 2008, an extension of Booth's algorithm for multiplying three operands on field-programmable gate arrays (FPGAs) 
    was proposed by Israeli researchers Y. Ben Asher and E. Stein&nbsp; 
    <a class = "no-decor no-hover trivia" href = "https://ieeexplore.ieee.org/document/4762411" target = "_blank">
    <i class = "fa fa-external-link no-hover"></i></a>`;

const trivia = [pencilTrivia, boothsTrivia, extendedBoothsTrivia];

/* --- PENCIL-AND-PAPER ALGORITHM --- */
const pencilIntro = `Similar to decimal multiplication, the Pencil-and-Paper method involves multiplying every digit of 
    the multiplicand to each digit of the multiplier and adding the intermediate products to arrive at the final answer. 
    However, due to the smaller radix of the binary number system, computing for the intermediate products is much simpler 
    than doing so for decimal multiplication. <br><br>`;

const pencilStepA = `<div class = "hanging-indent">
        <b>A.<span class="tab-13"></span>Represent the operands in two's complement.</b>
    </div>
    <div class = "indented hanging-indent">
        1.<span class="tab-13"></span>If the user enters a decimal number, it is represented using the fewest number of bits.
    </div>
    <div class = "indented hanging-indent">
        2.<span class="tab-13"></span>If the user enters a binary number, the number of bits follows the user's input. 
    </div>`;

const pencilStepB = `<div class = "hanging-indent">
        <b>B.<span class="tab-13"></span>If necessary, perform sign extension to make the number of bits of the operands equal.</b>
    </div>`;

const pencilStepC = `<div class = "hanging-indent">
        <b>C.<span class="tab-12"></span>Multiply the multiplicand with each digit of the multiplier.<br></b>
    </div>
    <div class = "indented hanging-indent">
        1.<span class="tab-13"></span>Sign extend the intermediate product until it has the same number
        of digits as the sum of the number of digits of the multiplicand and multiplier.
    </div>
    <div class = "indented hanging-indent">
        2.<span class="tab-13"></span>Similar to decimal pencil-and-paper multiplication, skip one bit after each 
        intermediate product. 
    </div>`;

const pencilStepD = `<div class = "hanging-indent">
        <b>D.<span class="tab-12"></span>If the multiplier is negative, add the 2's complement of the multiplicand as 
        the last intermediate product.</b>
    </div>`;

const pencilAlgo = `${pencilIntro}
    ${pencilStepA}
    ${pencilStepB}
    ${pencilStepC}
    ${pencilStepD}`;

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

const extendedBoothsStepA = `<div class = "hanging-indent">
        <b>A.<span class="tab-13"></span>Represent the operands in two's complement.</b>
    </div>
    <div class = "indented hanging-indent">
        1.<span class="tab-13"></span>If the user enters a decimal number, it is represented using the fewest number of bits.
    </div>
    <div class = "indented hanging-indent">
        2.<span class="tab-13"></span>If the user enters a binary number, the number of bits follows the user's input. 
    </div>`;

const extendedBoothsStepB = `<div class = "hanging-indent">
        <b>B.<span class="tab-13"></span>If necessary, perform sign extension to make the number of bits of the operands equal.</b>
    </div>`;

const extendedBoothsStepC0 = `<div class = "hanging-indent">
        <b>C.<span class="tab-13"></span>Convert the multiplier to its extended Booth's equivalent.</b>
    </div>`;

const extendedBoothsStepC1 = `<div class = "indented hanging-indent">
        1.<span class="tab-13"></span>Append 0 to the least significant bit.
    </div>`;

const extendedBoothsStepC2 = `<div class = "indented hanging-indent">
        2.<span class="tab-13"></span>If the multiplier has an odd number of bits (prior to appending 0), perform sign extension.
    </div>`;

const extendedBoothsStepC3 = `<div class = "indented hanging-indent">
        3.<span class="tab-13"></span>Perform bit-pair recoding starting at the least significant bit.
    </div>`;

const extendedBoothsStepC = `${extendedBoothsStepC0}
    ${extendedBoothsStepC1}
    ${extendedBoothsStepC2}
    ${extendedBoothsStepC3}`;

const extendedBoothsStepCShowTable = `<div class = "indented-1">
        Click <a onclick = "showExtendedBoothsRecoding(); scrollToExtendedBoothsRecoding();" class = "with-underline no-decor no-hover" id = "show-extended-booths-recording">here</a> 
        to <span id = "show-hide-extended-booths-recoding">show</span> the recoding table.
    </div>`;

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

const extendedBoothsStepD = `<div class = "hanging-indent">
        <b>D.<span class="tab-12"></span>Multiply using pencil-and-paper method &mdash; but ignore the extra step even if the multiplier 
        is negative.<br>
        Since a bit-pair is equivalent to two bits, skip <u>two</u> bits for each 
        intermediate product.</b>
    </div>`;

const extendedBoothsStepDShowTable = `<div class = "indented-0 small-top-space">
        Click <a onclick = "showExtendedBoothsOperations(); scrollToExtendedBoothsOperations();" class = "with-underline no-decor no-hover" id = "show-extended-booths-recording">here</a> 
        to <span id = "show-hide-extended-booths-operations">show</span> the multiplication guide.
    </div>`;

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
