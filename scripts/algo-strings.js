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

/* --- ALGORITHM --- */
const pencilAlgo = 
    ``;
const boothsAlgo = 
    ``;
const extendedBoothsAlgo = 
    `Introduced by O.L. MacSorley in 1961 
<a class = "no-decor no-hover trivia" href = "https://ieeexplore.ieee.org/document/4066249" target = "_blank">
<i class = "fa fa-external-link no-hover"></i></a>
and given a streamlined proof by L.P. Rubinfield in 1975 
<a class = "no-decor no-hover trivia" href = "https://ieeexplore.ieee.org/document/1672707" target = "_blank">
<i class = "fa fa-external-link no-hover"></i></a>, 
this technique, which is also known as <b>bit-pair recoding</b>,
reduces the number of intermediate summands by half. <br> <br>
<b>A. &nbsp; Represent the operands in two's complement using the fewest number of bits.</b> <br>
<b>B. &nbsp; If necessary, perform sign extension to make the number of bits of the operands equal.</b> <br>
<b>C. &nbsp; Convert the multipler to its extended Booth's equivalent.</b><br>
<span class = "indented">1. &nbsp; Append 0 to the least significant bit.</span><br>
<span class = "indented">2. &nbsp; If the multiplier has an odd number of bits (prior to appending 0), 
perform sign extension. <br>
<span class = "indented">3. &nbsp; Perform bit-pair recoding starting at the least significant bit.
<table class = "indented">
    <tr>
        <td>b</em><sub>2</sub><em>b</em><sub>1</sub>b</em><sub>0</sub></td>  
        <td>Booth's of <em>b</em><sub>2</sub><em>b</em><sub>1</sub></td>
        <td>Booth's of <em>b</em><sub>1</sub><em>b</em><sub>0</sub></td>
        <td>Derivation</td>
        <td>Recoding</td>
    </tr>
    
</table>`

const algoSteps = [pencilAlgo, boothsAlgo, extendedBoothsAlgo];