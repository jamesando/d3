<?php
?>

<html>

<head>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script> -->
    <script src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script src="https://d3js.org/d3.v4.min.js"></script>

    <style>
        #body {
            font-family: Lucida, serif;
        }
        
        .axis {
            font-size: 13px;
        }
        
        .axis path,
        .axis line {
            fill: none;
            display: none;
        }
        
        .label {
            font-size: 10px;
        }

        .title {
            font-size: 14px;
            font-weight: bold;
        }

        .subtitle {
            font-size: 10px;
            font-style: italic;
        }

        .center {
            max-width: 85%;
            max-height: 85%;
            vertical-align: middle;      
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .chartLabel {
            font-size: 10px;
        }

        .green {
            height: 25%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: white;
            background-color: green !important;
        }

        div.tooltip {	
            position: absolute;			
            text-align: center;			
            width: 120px;					
            height: 43px;					
            padding: 2px;				
            font: 12px sans-serif;		
            background: #00463c;	
            color: white;
            border: 0px;		
            border-radius: 8px;			
            pointer-events: none;			
        }

        /* Add shadow effect to chart. If you don't like it, get rid of it. */
        .pc {
            -webkit-filter: drop-shadow( 0px 3px 3px rgba(0,0,0,.3) );
            filter: drop-shadow( 0px 3px 3px rgba(0,0,0,.25) );
        }

        /*Styling for the lines connecting the labels to the slices*/
        polyline{
            opacity: .3;
            stroke: black;
            stroke-width: 2px;
            fill: none;
        }

        /* Make the percentage on the text labels bold*/
        .labelName tspan {
            font-style: normal;
            font-weight: 700;
        }

        /* In biology we generally italicise species names. */
        .labelName {
            font-size: 0.9em;
            font-style: italic;
        }



    </style>
</head>
<body class="rptBackground">
   <div class="reportContainer">
        <div class="placeholder" id="container"></div>
    </div>
</body>
</html>

<script type="text/javascript" src="script.js"></script>
