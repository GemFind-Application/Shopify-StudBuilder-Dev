<!DOCTYPE html>

<html>

  <head>

    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Diamond Details</title>

    <link

      rel="stylesheet"

      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"

    />

  </head>

  <body>

    <div class="personal-training-form">

      <div class="personal-training-heading" style="background-color:#1979c3; color: #fff;" >

        <h2>Diamond Detail # 1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <?php echo date("d/m/Y"); ?></h2>


      </div>

    <section class="diamonds-search with-specification diamond-page">

      <div class="d-container">

        <div class="d-row">

          <div

            class="diamonds-print-preview no-padding"style=" width: 100%; background-color: #f7f7f7 !important; border: 1px solid #e8e8e8 !important ; display: block; vertical-align: middle;">


              <div  style="width: 50%; float: left; padding-left: 30px; padding-top: 15px;">  

              <?php if(isset($diamond['diamondData']['image2'])) { ?>

                <img

                  src="<?php echo $diamond['diamondData']['image2'] ?>"

                  style="height: 100px; width: 100px"/>

               <?php } ?>      

               </div>

               <div style="width: 50%; float: left; padding-left: 80px; padding-top: 15px;">

                 <?php if(isset($diamond['diamondData']['image1'])) { ?>

                    <img

                    src="<?php echo $diamond['diamondData']['image1'] ?>"

                    style="height: 100px; width: 165px"/>

                 <?php } ?> 

               </div>

                

               <div class="skunumber" style="width: 100%; text-align: center;"> 

                  <p>

                    SKU#

                    <span style="color: #1979c3;"><?php echo $diamond['diamondData']['diamondID1'] ?></span>

                  </p>

               </div>

              </div>

               </div>

           </div>

        </div>

     </div>

      </section>

         &nbsp;&nbsp;&nbsp;

        <div class="personal-training-heading" style="background-color:#e8e8e8; color: #000; width: 100%; display: block; height: 100px; vertical-align: middle;"  >

         <div style="width: 10%; float: left; padding: 5px; ">

            <img

                src="<?php echo $diamond['diamondData']['certificateIconUrl1'] ?>"

                style="height: 75px; width: 75px;">

         </div>

          <div style="width: 80%; float: left;">

             <p style=" text-align: left; padding-top: 18px; padding-left: 15px;"><?php echo $diamond['diamondData']['subHeader']; ?>

          </div>

      </div>

      <div class="personal-training-heading" style="background-color:#1979c3; color: #fff; width: 100%; display: block;  height: 100px; vertical-align: middle;">

         <div style="width: 80%; float: left;">

        <h2 style="text-align: left;"><?php echo $diamond['diamondData']['mainHeader']; ?></h2>

        <p> <?php echo $diamond['diamondData']['subHeader']; ?> </p>

      </div>

      <div style="width: 10%; float: left; ">

         <p style="text-align: left; padding-top: 40px; padding-left: 50px;">

            <span><?php

               if($diamond['diamondData']['currencyFrom'] == 'USD'){

                  echo "$".number_format($diamond['diamondData']['fltPrice1']);

               }else{

                  echo $diamond['diamondData']['currencyFrom'].$diamond['diamondData']['currencySymbol'].number_format($diamond['diamondData']['fltPrice1']);

               }

            ?></span>

          </p>

         

      </div>

   </div>

      <div class="personal-training">

        <table class="table">

          <tbody>

            <?php if(isset($diamond['diamondData']['diamondID1'])) { ?>

              <tr>

                <td><b><?php echo 'Stock Number'; ?></b></td>

                <td><?php echo $diamond['diamondData']['diamondID1'] ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['caratWeight1'])) { ?>

              <tr>

                <td><b><?php echo 'Carat Weight'; ?></b></td>

                <td><?php echo $diamond['diamondData']['caratWeight1'] ? $diamond['diamondData']['caratWeight1'] : 'NA' ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['cutGrade1'])) { ?>

              <tr>

                <td><b><?php echo 'Cut'; ?></b></td>

                <td><?php echo $diamond['diamondData']['cutGrade1'] ? $diamond['diamondData']['cutGrade1'] : 'NA' ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['color1'])) { ?>

              <tr>

                <td><b><?php echo 'Color'; ?></b></td>

                <td><?php echo $diamond['diamondData']['color1'] ? $diamond['diamondData']['color1'] : 'NA' ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['clarity1'])) { ?>

              <tr>

                <td><b><?php echo 'Clarity'; ?></b></td>

                <td><?php echo $diamond['diamondData']['clarity1'] ? $diamond['diamondData']['clarity1'] : 'NA' ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['certificate1'])) { ?>

              <tr>

                <td><b><?php echo 'Report'; ?></b></td>

                <td><?php echo $diamond['diamondData']['certificate1'] ? $diamond['diamondData']['certificate1'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['depth1'])) { ?>

              <tr>

                <td><b><?php echo 'Depth %'; ?></b></td>

                <td><?php echo $diamond['diamondData']['depth1'] ? $diamond['diamondData']['depth1'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['tableMeasure1'])) { ?>

              <tr>

                <td><b><?php echo 'Table %'; ?></b></td>

                <td><?php echo $diamond['diamondData']['tableMeasure1'] ? $diamond['diamondData']['tableMeasure1'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['polish1'])) { ?>

              <tr>

                <td><b><?php echo 'Polish'; ?></b></td>

                <td><?php echo $diamond['diamondData']['polish1'] ? $diamond['diamondData']['polish1'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['symmetry1'])) { ?>

              <tr>

                <td><b><?php echo 'Symmetry'; ?></b></td>

                <td><?php echo $diamond['diamondData']['symmetry1'] ? $diamond['diamondData']['symmetry1'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['girdleThick'])) { ?>

              <tr>

                <td><b><?php echo 'Girdle'; ?></b></td>

                <td><?php echo $diamond['diamondData']['girdleThick'] ? $diamond['diamondData']['girdleThick'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['culet'])) { ?>

              <tr>

                <td><b><?php echo 'Culet'; ?></b></td>

                <td><?php echo $diamond['diamondData']['culet'] ? $diamond['diamondData']['culet'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['flouresence1'])) { ?>

              <tr>

                <td><b><?php echo 'Fluorescence'; ?></b></td>

                <td><?php echo $diamond['diamondData']['flouresence1'] ? $diamond['diamondData']['flouresence1'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['measurements1'])) { ?>

              <tr>

                <td><b><?php echo 'Measurement'; ?></b></td>

                <td><?php echo $diamond['diamondData']['measurements1'] ? $diamond['diamondData']['measurements1'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

          </tbody>

        </table>

      </div>


      <!-- second Diamond -->
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

      <div class="personal-training-heading" style="background-color:#1979c3; color: #fff;" >

        <h2>Diamond Detail # 2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <?php echo date("d/m/Y"); ?></h2>

      
      </div>

    <section class="diamonds-search with-specification diamond-page">

      <div class="d-container">

        <div class="d-row">

          <div

            class="diamonds-print-preview no-padding"style=" width: 100%; background-color: #f7f7f7 !important; border: 1px solid #e8e8e8 !important ; display: block; vertical-align: middle;">



              <div  style="width: 50%; float: left; padding-left: 30px; padding-top: 15px;">  

              <?php if(isset($diamond['diamondData']['image2'])) { ?>

                <img

                  src="<?php echo $diamond['diamondData']['image2'] ?>"

                  style="height: 100px; width: 100px"/>

               <?php } ?>      

               </div>

               <div style="width: 50%; float: left; padding-left: 80px; padding-top: 15px;">

                 <?php if(isset($diamond['diamondData']['image1'])) { ?>

                    <img

                    src="<?php echo $diamond['diamondData']['image1'] ?>"

                    style="height: 100px; width: 165px"/>

                 <?php } ?> 

               </div>

               <div class="skunumber" style="width: 100%; text-align: center;"> 

                  <p>

                    SKU#

                    <span style="color: #1979c3;"><?php echo $diamond['diamondData']['diamondID2'] ?></span>

                  </p>

               </div>
        
              </div>

           </div>

        </div>

     </div>

      </section>



         &nbsp;&nbsp;&nbsp;

        <div class="personal-training-heading" style="background-color:#e8e8e8; color: #000; width: 100%; display: block; height: 100px; vertical-align: middle;"  >

         <div style="width: 10%; float: left; padding: 5px; ">

            <img

                src="<?php echo $diamond['diamondData']['certificateIconUrl2'] ?>"

                style="height: 75px; width: 75px;">

         </div>

          <div style="width: 80%; float: left;">

             <p style=" text-align: left; padding-top: 18px; padding-left: 15px;"><?php echo $diamond['diamondData']['subHeader']; ?>

          </div>

      </div>

      <div class="personal-training-heading" style="background-color:#1979c3; color: #fff; width: 100%; display: block;  height: 100px; vertical-align: middle;">

         <div style="width: 80%; float: left;">

        <h2 style="text-align: left;"><?php echo $diamond['diamondData']['mainHeader']; ?></h2>

        <p> <?php echo $diamond['diamondData']['subHeader']; ?> </p>

      </div>

      <div style="width: 10%; float: left; ">

         <p style="text-align: left; padding-top: 40px; padding-left: 50px;">

            <span><?php

               if($diamond['diamondData']['currencyFrom'] == 'USD'){

                  echo "$".number_format($diamond['diamondData']['fltPrice2']);

               }else{

                  echo $diamond['diamondData']['currencyFrom'].$diamond['diamondData']['currencySymbol'].number_format($diamond['diamondData']['fltPrice2']);

               }

            ?></span>

          </p>       

      </div>

   </div>

   
      <div class="personal-training">

        <table class="table">

          <tbody>

            <?php if(isset($diamond['diamondData']['stockNumber2'])) { ?>

              <tr>

                <td><b><?php echo 'Stock Number'; ?></b></td>

                <td><?php echo $diamond['diamondData']['stockNumber2'] ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['caratWeight2'])) { ?>

              <tr>

                <td><b><?php echo 'Carat Weight'; ?></b></td>

                <td><?php echo $diamond['diamondData']['caratWeight2'] ? $diamond['diamondData']['caratWeight2'] : 'NA' ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['cutGrade2'])) { ?>

              <tr>

                <td><b><?php echo 'Cut'; ?></b></td>

                <td><?php echo $diamond['diamondData']['cutGrade2'] ? $diamond['diamondData']['cutGrade2'] : 'NA' ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['color2'])) { ?>

              <tr>

                <td><b><?php echo 'Color'; ?></b></td>

                <td><?php echo $diamond['diamondData']['color2'] ? $diamond['diamondData']['color2'] : 'NA' ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['clarity2'])) { ?>

              <tr>

                <td><b><?php echo 'Clarity'; ?></b></td>

                <td><?php echo $diamond['diamondData']['clarity2'] ? $diamond['diamondData']['clarity2'] : 'NA' ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['certificate2'])) { ?>

              <tr>

                <td><b><?php echo 'Report'; ?></b></td>

                <td><?php echo $diamond['diamondData']['certificate2'] ? $diamond['diamondData']['certificate2'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['depth2'])) { ?>

              <tr>

                <td><b><?php echo 'Depth %'; ?></b></td>

                <td><?php echo $diamond['diamondData']['depth2'] ? $diamond['diamondData']['depth2'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['tableMeasure2'])) { ?>

              <tr>

                <td><b><?php echo 'Table %'; ?></b></td>

                <td><?php echo $diamond['diamondData']['tableMeasure2'] ? $diamond['diamondData']['tableMeasure2'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['polish2'])) { ?>

              <tr>

                <td><b><?php echo 'Polish'; ?></b></td>

                <td><?php echo $diamond['diamondData']['polish2'] ? $diamond['diamondData']['polish2'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['symmetry2'])) { ?>

              <tr>

                <td><b><?php echo 'Symmetry'; ?></b></td>

                <td><?php echo $diamond['diamondData']['symmetry2'] ? $diamond['diamondData']['symmetry2'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['girdleThick'])) { ?>

              <tr>

                <td><b><?php echo 'Girdle'; ?></b></td>

                <td><?php echo $diamond['diamondData']['girdleThick'] ? $diamond['diamondData']['girdleThick'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['culet'])) { ?>

              <tr>

                <td><b><?php echo 'Culet'; ?></b></td>

                <td><?php echo $diamond['diamondData']['culet'] ? $diamond['diamondData']['culet'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['flouresence2'])) { ?>

              <tr>

                <td><b><?php echo 'Fluorescence'; ?></b></td>

                <td><?php echo $diamond['diamondData']['flouresence2'] ? $diamond['diamondData']['flouresence2'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

            <?php if(isset($diamond['diamondData']['measurements2'])) { ?>

              <tr>

                <td><b><?php echo 'Measurement'; ?></b></td>

                <td><?php echo $diamond['diamondData']['measurements2'] ? $diamond['diamondData']['measurements2'] : 'NA' ; ?></td>

              </tr>

            <?php } ?>

          </tbody>

        </table>

      </div>

       <!-- Stud Detail -->
       <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

       <div class="personal-training-heading" style="background-color:#1979c3; color: #fff;" >
 
         <h2>Stud Detail &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <?php echo date("d/m/Y"); ?></h2>
 
       
       </div>

       <section class="diamonds-search with-specification diamond-page">

        <div class="d-container">
  
          <div class="d-row">
  
            <div
  
              class="diamonds-print-preview no-padding"style=" width: 100%; background-color: #f7f7f7 !important; border: 1px solid #e8e8e8 !important ; display: block; vertical-align: middle;">
  
  
  
                <div  style="width: 50%; float: left; padding-left: 30px; padding-top: 15px;">  
  
                <?php if(isset($diamond['diamondData']['image2'])) { ?>
  
                  <img
  
                    src="<?php echo $diamond['diamondData']['image2'] ?>"
  
                    style="height: 100px; width: 100px"/>
  
                 <?php } ?>      
  
                 </div>
  
                 <div style="width: 50%; float: left; padding-left: 80px; padding-top: 15px;">
  
                   <?php if(isset($diamond['diamondData']['image1'])) { ?>
  
                      <img
  
                      src="<?php echo $diamond['diamondData']['image1'] ?>"
  
                      style="height: 100px; width: 165px"/>
  
                   <?php } ?> 
  
                 </div>
  
                 <div class="skunumber" style="width: 100%; text-align: center;"> 
  
                    <p>
  
                      SKU#
  
                      <span style="color: #1979c3;"><?php echo $diamond['studData']['gfInventoryID'] ?></span>
  
                    </p>
  
                 </div>
          
                </div>
  
             </div>
  
          </div>
  
       </div>
  
        </section>
  
  
  
           &nbsp;&nbsp;&nbsp;


           <div class="personal-training-heading" style="background-color:#e8e8e8; color: #000; width: 100%; display: block; height: 100px; vertical-align: middle;"  >

            <div style="width: 10%; float: left; padding: 5px; ">
   
               <img
   
                   src="<?php echo $diamond['diamondData']['certificateIconUrl2'] ?>"
   
                   style="height: 75px; width: 75px;">
   
            </div>
   
             <div style="width: 90%; float: left;">
   
                <p style=" text-align: left; padding-top: 18px; padding-left: 15px; font-size:15px;"><?php echo $diamond['studData']['productDescription']; ?>
   
             </div>
   
         </div>
   
         <div class="personal-training-heading" style="background-color:#1979c3; color: #fff; width: 100%; display: block;  height: 100px; vertical-align: middle;">
   
            <div style="width: 100%; float: left;">
   
           <h2 style="text-align: left;"><?php echo $diamond['studData']['productName']; ?></h2>
   
           <p> <?php echo $diamond['studData']['productDescription']; ?> </p>
   
         </div>
   
         </div>


         <div class="personal-training">

          <table class="table">
  
            <tbody>
  
              <?php if(isset($diamond['studData']['stockNumber2'])) { ?>
  
                <tr>
  
                  <td><b><?php echo 'Style Number'; ?></b></td>
  
                  <td><?php echo $diamond['studData']['styleNumber'] ?></td>
  
                </tr>
  
              <?php } ?>


              <?php if(isset($diamond['studData']['productName'])) { ?>
  
                <tr>
  
                  <td><b><?php echo 'Product Name'; ?></b></td>
  
                  <td><?php echo $diamond['studData']['productName'] ?></td>
  
                </tr>
  
              <?php } ?>
  
              <?php if(isset($diamond['studData']['metalType'])) { ?>
  
                <tr>
  
                  <td><b><?php echo 'Metal Type'; ?></b></td>
  
                  <td><?php echo $diamond['studData']['metalType'] ? $diamond['studData']['metalType'] : 'NA' ?></td>
  
                </tr>
  
              <?php } ?>
  
              <?php if(isset($diamond['studData']['metalColor'])) { ?>
  
                <tr>
  
                  <td><b><?php echo 'Metal Color'; ?></b></td>
  
                  <td><?php echo $diamond['studData']['metalColor'] ? $diamond['studData']['metalColor'] : 'NA' ?></td>
  
                </tr>
  
              <?php } ?>
  
              <?php if(isset($diamond['studData']['categoryName'])) { ?>
  
                <tr>
  
                  <td><b><?php echo 'Category'; ?></b></td>
  
                  <td><?php echo $diamond['studData']['categoryName'] ? $diamond['studData']['categoryName'] : 'NA' ?></td>
  
                </tr>
  
              <?php } ?>
  
              <?php if(isset($diamond['studData']['collectionName'])) { ?>
  
                <tr>
  
                  <td><b><?php echo 'Collection'; ?></b></td>
  
                  <td><?php echo $diamond['studData']['collectionName'] ? $diamond['studData']['collectionName'] : 'NA' ?></td>
  
                </tr>
  
              <?php } ?>
  
              <?php if(isset($diamond['studData']['centerStoneFit'])) { ?>
  
                <tr>
  
                  <td><b><?php echo 'Shape'; ?></b></td>
  
                  <td><?php echo $diamond['studData']['centerStoneFit'] ? $diamond['studData']['centerStoneFit'] : 'NA' ; ?></td>
  
                </tr>
  
              <?php } ?>

  
            </tbody>
  
          </table>
  
        </div>
       

      

    </div>

  </body>

</html>

