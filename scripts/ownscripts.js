function generatePrimes( integer_number ) {
        let prime_list = [2];
        let prime_result = true;

        for (let indexer = 3; indexer <= integer_number; indexer += 2 ) {
                for ( let tester = 0; tester < prime_list.length && prime_result; tester ++ ) {
                        if ( indexer % prime_list[ tester ] == 0 ) {
                                prime_result = false;
                        }
                }
                if ( prime_result ) {
                        prime_list.push( indexer );
                }
                prime_result = true;
        }

        return prime_list;
}


function primeComposition( integer_number ) {
        let square_int = Number.parseInt( Math.sqrt( integer_number ) );
        let prime_list = generatePrimes( square_int );
        let prime_composition = [];
        let number_compose = integer_number;

        for ( let indexer = 0; prime_list[ indexer ] <= number_compose; indexer++ ) {
                if ( number_compose % prime_list[ indexer ] == 0 ) {
                        prime_composition.push( prime_list[ indexer ] );
                        number_compose = number_compose / prime_list[ indexer ];
                        indexer--;
                }
        }
        if ( number_compose > 1 ) {
                prime_composition.push( number_compose );
        }

        return prime_composition;
}

function greatestCommonDivisor( first_number, second_number ) {
        let temp_array1 = primeComposition( first_number );
        let temp_array2 = primeComposition( second_number );
        let greatest_common = 1;
         
        if ( first_number == 0 || second_number == 0) {
                return 1;
        }

        do {
                let number_to_test = temp_array1[ 0 ];
                temp_array1.splice( 0, 1 );
                if ( temp_array2.indexOf( number_to_test ) != -1 ) {
                        greatest_common *= number_to_test;
                        temp_array2.splice( temp_array2.indexOf( number_to_test ), 1 );
                }
        }
        while ( temp_array1.length && temp_array2.length );

        return greatest_common;
}

function getSquaresOut( prime_composition_array ) {
        let squares = [];
        let primes_and_powers = new Map();
        let temporary_array = prime_composition_array;
        let square_about_to_get_out = 1;
        primes_and_powers.set( 1, 1 );

        do {
                let prime_to_check = temporary_array.splice( 0, 1 );
                if ( temporary_array.indexOf( Number( prime_to_check ) ) != -1 ) {
                        if ( primes_and_powers.has( Number( prime_to_check ) ) ) {
                                let indexer = primes_and_powers.get( Number(prime_to_check ) );
                                let temporary_indexer = Number( indexer );
                                temporary_indexer++;
                                primes_and_powers.set( Number( prime_to_check ), temporary_indexer );
                        }
                        else {
                                primes_and_powers.set( Number( prime_to_check ) , 2 );
                        }
                }
        }
        while ( temporary_array.length > 0 );
        let indexer = primes_and_powers.keys();

        for ( let primes of indexer ) {
                if ( primes_and_powers.get( primes ) % 2 != 0 ) {
                        let power = primes_and_powers.get( primes );
                        power--;
                        primes_and_powers.set( Number( primes ), power );
                }
        }
        let indexer2 = primes_and_powers.keys();
        for ( let primes of indexer2 ) {
                square_about_to_get_out *= Math.pow( primes, primes_and_powers.get( Number( primes )) );
        }

        return square_about_to_get_out;
}
        
        
function getroots() {

        var second_dgr_coef = Number( document.getElementById( "second_dgr" ).value );
        var first_dgr_coef = Number( document.getElementById( "first_dgr" ).value );
        var constant_coef = Number( document.getElementById( "constant_dgr" ).value );
        var solution_field = document.getElementById( "solution" );
        var discriminant = first_dgr_coef * first_dgr_coef - ( 4 * second_dgr_coef * constant_coef );
        var discriminant_root; 
        var complex = false;
        var roots = [];
        var we_have_integers = false;
        var second_dgr_comp, first_dgr_comp;
        var square_from_discriminant;
        var gcd_second_first, gcd_first_dis_sqr, gcd_second_dis_sqr, gcd_outside_sqrt_first_dgr, gcd_top_bottom, inside_sqrt_root, outside_sqrt_root;
        
        if ( second_dgr_coef == 0 ) {
                solution_field.innerHTML = "Coefficient a cannot be 0!";
                return 1;
        }
        if ( isNaN( second_dgr_coef ) || isNaN( first_dgr_coef ) || isNaN( constant_coef ) ) {
                solution_field.innerHTML = "Please use numbers only!";
                return 1;
        }
                          
// If the user gives all integer coefficients for the second degree polynomial the program will give an exact answer for the root instead of
// approximate values when he uses decimal numbers.       
        if ( Number.isInteger( second_dgr_coef ) && Number.isInteger( first_dgr_coef ) && Number.isInteger( constant_coef ) ) {
                we_have_integers = true;
                square_from_discriminant = getSquaresOut( primeComposition( Math.abs(discriminant) ) );
                gcd_second_first = greatestCommonDivisor( 2 * Math.abs( second_dgr_coef ), Math.abs( first_dgr_coef ) );
                gcd_first_dis_sqr = greatestCommonDivisor( Math.abs( first_dgr_coef ), Math.sqrt( square_from_discriminant ) );
                gcd_second_dis_sqr = greatestCommonDivisor( 2 * Math.abs( second_dgr_coef ), Math.sqrt( square_from_discriminant ) );
                inside_sqrt_root = Math.abs( discriminant ) / square_from_discriminant;
                outside_sqrt_root = Math.sqrt( square_from_discriminant );
                gcd_outside_sqrt_first_dgr = greatestCommonDivisor( Math.abs( outside_sqrt_root ), Math.abs( first_dgr_coef ) );
                if ( first_dgr_coef != 0 ){
                        gcd_top_bottom = greatestCommonDivisor( gcd_outside_sqrt_first_dgr, 2 * Math.abs( second_dgr_coef ) );
                }
                else {
                        gcd_top_bottom = greatestCommonDivisor( outside_sqrt_root, 2 * Math.abs( second_dgr_coef ) );
                }

        }

       if ( discriminant < 0 ) {
                complex = true;
                
                if ( !we_have_integers ) {
                       discriminant_root = Math.sqrt( Math.abs( discriminant ) );
                }
                else {
                       discriminant_root = Math.abs( inside_sqrt_root );
                }
       }
       else {
               if ( !we_have_integers ) {
                       discriminant_root = Math.sqrt( discriminant );
               }
               else {
                       discriminant_root = inside_sqrt_root;
               }
      
       }



       if ( complex ) {

               if ( !we_have_integers ) {
                       roots.push( ( - first_dgr_coef ) / ( 2 * second_dgr_coef ) );
                       roots.push( discriminant_root / ( 2 * first_dgr_coef ) );
                       solution_field.innerHTML = "$$ x = \\begin{cases} &" + roots[0] + " + " + Math.abs( roots[1] ) + "i \\"+"\\ \\ &" + roots[0] + " - " + Math.abs( roots[1] ) + "i \\end{cases} $$";
               }
               else {
               //We are here because user entered integers only. Reason for making four if statements here is to get rid of situations where we 1 inside the square root and to get the
               //signs appear correctly. Statement ( ( inside_sqrt_root == 1) ? "1" : "\\sqrt{" + inside_sqrt_root + "}" ) checks if we're trying to display square root of one and replaces
               //the square root with number one. Also we don't to 1 to appear as a denominator. Next time I'll plan before starting to code. 
                       let first_sign = ( (first_dgr_coef > 0 && second_dgr_coef > 0) || (first_dgr_coef < 0 && second_dgr_coef < 0) ) ? "-":"";
                       let second_sign = ( second_dgr_coef < 0 ) ? "-":"";
                       let second_fraction = ( (2 * Math.abs( second_dgr_coef ) ) / gcd_second_dis_sqr == 1 ) ? 0:1;
                       let first_fraction = ( Math.abs( 2 * second_dgr_coef ) / gcd_second_first == 1 ) ? 0:1;
                       let square_root_multiplier = ( outside_sqrt_root / gcd_second_dis_sqr == 1 ) ? "": "" + outside_sqrt_root / gcd_second_dis_sqr + "" ;
                       console.log( "first fraction and second fraction are " + first_fraction + " " + second_fraction );
                       if ( first_dgr_coef == 0 && inside_sqrt_root != 1 ) {
                               solution_field.innerHTML = "$$ x = \\begin{cases} &" + ( ( second_fraction == 1 ) ? "{" + square_root_multiplier + "\\sqrt{" +  inside_sqrt_root + "} \\over " + Math.abs( 2 * second_dgr_coef) / gcd_second_dis_sqr + "}i " : square_root_multiplier + "\\sqrt{" + inside_sqrt_root + "}i " ) + "\\" + "\\ \\ &  " + ( ( second_fraction == 1 ) ? "-{" + square_root_multiplier + "\\sqrt{" +  inside_sqrt_root + "} \\over " + Math.abs( 2 * second_dgr_coef) / gcd_second_dis_sqr + "}i " : "-" + square_root_multiplier + "\\sqrt{" +  inside_sqrt_root + " }i " ) + "\\end{cases}$$";
                               return;
                       }
                       if ( first_dgr_coef == 0 && inside_sqrt_root == 1 ) {
                               solution_field.innerHTML = "$$ x = \\begin{cases} &" + ( ( second_fraction == 1 ) ? "{" + ( ( square_root_multiplier == "" ) ? "1" : square_root_multiplier ) +  " \\over " + Math.abs( 2 * second_dgr_coef) / gcd_second_dis_sqr + "}i" : square_root_multiplier + "i" ) + "\\" + "\\ \\ & " + ( ( second_fraction == 1 ) ? "-{" + (( square_root_multiplier == "" ) ? "1" : square_root_multiplier ) + " \\over " + Math.abs( 2 * second_dgr_coef) / gcd_second_dis_sqr + "}i" : "-" + square_root_multiplier + "i" ) + "\\end{cases}$$";
                               return;
                       }
                       if ( first_fraction == 0 && second_fraction != 0 ) {
                               solution_field.innerHTML = "$$ x = \\begin{cases} & " + first_sign + ( Math.abs(first_dgr_coef / gcd_second_first )) + " + " + "{" + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "1" : "\\sqrt{" + inside_sqrt_root + "}" ) +  "\\over " + Math.abs((2 * second_dgr_coef) / gcd_second_dis_sqr ) + "}i \\" + "\\ \\ & " + first_sign +  Math.abs( first_dgr_coef / gcd_second_first )  + " - {" + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "1" : "\\sqrt{" + inside_sqrt_root + "}" ) +  " \\over " + Math.abs( (2 * second_dgr_coef) / gcd_second_dis_sqr ) + "}i " + "\\end{cases} $$";
                       }
                       if ( first_fraction == 0 && second_fraction == 0 ) {
                               solution_field.innerHTML = "$$ x = \\begin{cases} & " + first_sign + ( Math.abs(first_dgr_coef / gcd_second_first )) + " + " + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "" : "\\sqrt{" + inside_sqrt_root + "}" ) + "i \\" + "\\ \\ & " + first_sign +  Math.abs( first_dgr_coef / gcd_second_first )  + " - " + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "" : "\\sqrt{" + inside_sqrt_root + "}" ) + "i  \\end{cases} $$";
                       }
                       if ( first_fraction != 0 && second_fraction == 0 ) {
                               solution_field.innerHTML = "$$ x = \\begin{cases} & " + first_sign + "{" + ( Math.abs(first_dgr_coef / gcd_second_first )) + "\\over " + Math.abs( 2 * second_dgr_coef ) / gcd_second_first + "} + " + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "" : "\\sqrt{" + inside_sqrt_root + "}" ) + " i \\" + "\\ \\ & {" + first_sign +  Math.abs( first_dgr_coef / gcd_second_first )  + "\\over " +  Math.abs( 2 * second_dgr_coef ) / gcd_second_first + "} - " + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "" : "\\sqrt{" + inside_sqrt_root + "}" ) +" i " + "\\end{cases} $$";
                       }
                       if ( first_fraction == 1 && second_fraction == 1 ) {
                               solution_field.innerHTML = "$$ x = \\begin{cases} & " + first_sign + "{" + ( Math.abs(first_dgr_coef / gcd_second_first )) + "\\over " + Math.abs( 2 * second_dgr_coef ) / gcd_second_first + "} + {" + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "1" : "\\sqrt{" + inside_sqrt_root + "}" ) +" \\over " + Math.abs((2 * second_dgr_coef) / gcd_second_dis_sqr ) + "}i \\" + "\\ \\ & " + first_sign +"{"  + Math.abs( first_dgr_coef / gcd_second_first )  + "\\over " + Math.abs( 2 * second_dgr_coef ) / gcd_second_first + "} - {" + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "1" : "\\sqrt{" + inside_sqrt_root + "}" ) + "\\over " + Math.abs( (2 * second_dgr_coef) / gcd_second_dis_sqr ) + "}i " + "\\end{cases} $$";
                       }

  
               }
       }
       else {
               
               if ( !we_have_integers ) {
                       roots.push( (( -first_dgr_coef ) + discriminant_root ) / ( 2 * second_dgr_coef ) );
                       roots.push( (( -first_dgr_coef ) - discriminant_root ) / ( 2 * second_dgr_coef ) );
                       
                       if ( roots[0] != roots[1] ) {
                               solution_field.innerHTML = "$$ x = \\begin{cases} &" + roots[0] + "\\" + "\\ &" + roots[1] + "\\end{cases} $$";
                       }
                       else {
                               solution_field.innerHTML  = "\\(x = " + roots[0] + "\\)";
                       }
               }
               else {
                       let first_sign = ( (first_dgr_coef > 0 && second_dgr_coef > 0) || (first_dgr_coef < 0 && second_dgr_coef < 0) ) ? "-":"";
                       let second_sign = ( second_dgr_coef < 0 ) ? "-":"";
                       let second_fraction = ( (2 * Math.abs( second_dgr_coef ) ) / gcd_second_dis_sqr == 1 ) ? 0:1;
                       let first_fraction = ( Math.abs( 2 * second_dgr_coef ) / gcd_second_first == 1 ) ? 0:1;
                       let square_root_multiplier = ( outside_sqrt_root / gcd_top_bottom == 1 ) ? "": "" + outside_sqrt_root / gcd_second_dis_sqr + "" ;
                       let denominator = ( Math.abs( 2 * second_dgr_coef ) / gcd_top_bottom == 1 ) ? 0:1;
                       
                       if ( discriminant == 0 ){
                               if ( ( 2 * Math.abs( second_dgr_coef ) )/ gcd_second_first  != 1 && ( first_dgr_coef != 0 || constant_coef != 0 ) ) {
                                       solution_field.innerHTML = "$$ x = {" + ( - first_dgr_coef / gcd_second_first ) + "\\over " + ( 2 * second_dgr_coef / gcd_second_first ) + "}$$";
                               }
                               else if ( first_dgr_coef == 0 && constant_coef == 0 ) {
                                       solution_field.innerHTML = "$$ x = 0 $$";
                               }
                               else {
                                       solution_field.innerHTML = "$$ x = " + ( - first_dgr_coef / gcd_second_first ) + " $$";
                               }  
                       }
                       else if ( constant_coef == 0 ) {
                               if ( (2 * Math.abs( second_dgr_coef ) ) / greatestCommonDivisor( 2 * Math.abs( first_dgr_coef ), 2 * Math.abs(second_dgr_coef ) ) != 1 ) {
                                       solution_field.innerHTML = "$$ x = \\begin{cases} & 0 \\" + "\\ & " + first_sign + "{" + ( 2 * Math.abs( first_dgr_coef ) / greatestCommonDivisor( 2 * Math.abs( first_dgr_coef ), 2 * Math.abs(second_dgr_coef ) ) ) + " \\over " +  Math.abs( 2 * second_dgr_coef)  / greatestCommonDivisor( 2 * Math.abs( first_dgr_coef ), 2 * Math.abs(second_dgr_coef ) ) + "}\\end{cases} $$";
                               }
                               else {
                                       solution_field.innerHTML = "$$ x = \\begin{cases} & 0 \\" + "\\ & " + first_sign  + ( Math.abs( first_dgr_coef )/ greatestCommonDivisor( first_dgr_coef, second_dgr_coef ) ) + "\\end{cases} $$";
                               } 

                       }
                       else {
                               let gcd_top_sum_denominator = greatestCommonDivisor( Math.abs( (  -first_dgr_coef ) + outside_sqrt_root ), 2 * Math.abs( second_dgr_coef ) );
                               let gcd_top_sum_den_second = greatestCommonDivisor( ( Math.abs( (  -first_dgr_coef ) - outside_sqrt_root ), 2 * Math.abs( second_dgr_coef ) ) );
                               let no_sqrt_denom = Math.abs( 2 * second_dgr_coef ) / gcd_top_sum_denominator;
                               let nominator_sum_first = ( inside_sqrt_root == 1 ) ?  -first_dgr_coef  + outside_sqrt_root : 0;
                               let nominator_sum_second = ( inside_sqrt_root == 1 ) ?  -first_dgr_coef  - outside_sqrt_root : 0;
                               let nominator_first = nominator_sum_first / gcd_top_sum_denominator;
                               let nominator_second = nominator_sum_second / gcd_top_sum_den_second;
                               let below_nominator_first = ( 2 * Math.abs( second_dgr_coef ) ) / gcd_top_sum_denominator;
                               let below_nominator_second = ( 2 * Math.abs( second_dgr_coef ) ) / gcd_top_sum_den_second; 
                               let first_sign_nom = Math.sign( nominator_first ) * Math.sign(  2 * second_dgr_coef  / gcd_top_sum_denominator );
                               let second_sign_nom = Math.sign( nominator_second ) * Math.sign(  2 * second_dgr_coef  / gcd_top_sum_denominator );
                               let first_sign_to_place = ( first_sign_nom == -1 ) ? "-":"";
                               let second_sign_to_place = ( second_sign_nom == -1 ) ? "-":""; 
                               
                              
                               if ( first_dgr_coef == 0 && constant_coef != 0 ) {
                                       let first_string_to_enter, second_string_to_enter;
                                       first_string_to_enter = ( Math.abs( 2 * second_dgr_coef ) / gcd_top_bottom == 1 ) ? square_root_multiplier + ( ( inside_sqrt_root == 1) ? "" : "\\sqrt{" + inside_sqrt_root + "}" ) : "{" + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "" : "\\sqrt{" + inside_sqrt_root + "}" ) + "\\over " + ( Math.abs( 2 * second_dgr_coef ) / gcd_top_bottom ) + "}";
                                       second_string_to_enter = ( Math.abs( 2 * second_dgr_coef ) / gcd_top_bottom == 1 ) ? "-" +  square_root_multiplier + ( ( inside_sqrt_root == 1) ? "" : "\\sqrt{" + inside_sqrt_root + "}" ) : "-{" + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "" : "\\sqrt{" + inside_sqrt_root + "}" ) + "\\over " + ( Math.abs(2 * second_dgr_coef ) / gcd_top_bottom ) + "}";

                                       solution_field.innerHTML = "$$ x = \\begin{cases} &" + first_string_to_enter + "\\" + "\\ &" + second_string_to_enter +  "\\end{cases}$$";
                                       return;
                               }

                               if ( denominator == 1 ) {
                                       if ( inside_sqrt_root == 1 ) {
                                               let gcd_nom_first = greatestCommonDivisor( Math.abs( nominator_first ), below_nominator_first );
                                               let gcd_nom_second = greatestCommonDivisor( Math.abs( nominator_second ), below_nominator_second );
                                               let new_nominator_first = nominator_first / gcd_nom_first;
                                               let new_nominator_second = nominator_second / gcd_nom_second;
                                               let new_below_nominator_first = below_nominator_first / gcd_nom_first;
                                               let new_below_nominator_second = below_nominator_second / gcd_nom_second;
                                               let first_string_to_enter = ( new_below_nominator_first == 1 ) ? Math.sign( second_dgr_coef ) * new_nominator_first : first_sign_to_place + "{" + Math.abs( new_nominator_first ) + "\\over " +new_below_nominator_first + "}";
                                               let second_string_to_enter = ( new_below_nominator_second == 1 ) ? Math.sign( second_dgr_coef ) * new_nominator_second : second_sign_to_place + "{" + Math.abs( new_nominator_second ) + "\\over " + new_below_nominator_second + "}";

                                               solution_field.innerHTML = "$$ x = \\begin{cases} & " + first_string_to_enter + "\\" + "\\ &" + second_string_to_enter + "\\end{cases} $$";

                                       }
                                       else {
                                       solution_field.innerHTML = "$$ x = \\begin{cases} &" + first_sign + " {" + ( Math.abs( first_dgr_coef ) / gcd_top_bottom ) + " + " + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "1" : "\\sqrt{" + inside_sqrt_root + "}" ) + "\\over " + ( Math.abs(2 * second_dgr_coef ) / gcd_top_bottom ) + "} \\" + "\\ &" + first_sign + "{" + ( Math.abs(first_dgr_coef) / gcd_top_bottom ) + " - " + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "1" : "\\sqrt{" + inside_sqrt_root + "}" ) + "\\over " + ( 2 * Math.abs( second_dgr_coef ) / gcd_top_bottom ) + "}\\end{cases}$$";
                                       }
                               }
                               else if ( inside_sqrt_root == 1 ) {
                                       let gcd_nom_first = greatestCommonDivisor( Math.abs( nominator_first ), below_nominator_first );
                                       let gcd_nom_second = greatestCommonDivisor( Math.abs( nominator_second ), below_nominator_second );
                                       console.log("Here " + outside_sqrt_root + " " + first_dgr_coef + gcd_nom_second);
                                       solution_field.innerHTML = "$$ x = \\begin{cases} &" +  Math.sign( second_dgr_coef ) * ( ( -first_dgr_coef )  + outside_sqrt_root ) / gcd_top_bottom   +  " \\" + "\\ &" + Math.sign( second_dgr_coef ) * ( ( -first_dgr_coef) - outside_sqrt_root ) / gcd_nom_second  + " \\end{cases}$$";
                               }
                               else {
                                       solution_field.innerHTML = "$$ x = \\begin{cases} &" + first_sign  + ( Math.abs( first_dgr_coef ) / gcd_top_bottom ) + " + " + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "" : "\\sqrt{" + inside_sqrt_root + "}" )  +  " \\" + "\\ &" + first_sign + ( Math.abs(first_dgr_coef) / gcd_top_bottom ) + " - " + square_root_multiplier + ( ( inside_sqrt_root == 1) ? "" : "\\sqrt{" + inside_sqrt_root + "}" ) + " \\end{cases}$$";
                               }
                       }

               }
       } 


}

function numbersystable( action ) {
        var indexer;
        var numbers_in_table = [];
        var table = document.getElementById( "number_table" );

        if ( action && table.title == "empty" ) {
                
                for ( indexer = 0; indexer <= 50; indexer++ ) {
                           
                        numbers_in_table.push( indexer.toString() );
                        numbers_in_table.push( indexer.toString(2) );
                        numbers_in_table.push( indexer.toString(8) );
                        numbers_in_table.push( indexer.toString(16) );
                }

                for ( indexer = 0; indexer < numbers_in_table.length; indexer += 4 ) {

                        if ( ( indexer / 4 ) % 2 == 0 ) {
                                table.innerHTML += "<tr style='background-color:rgb(237,237,237)'> <td> " + numbers_in_table[ indexer] + " </td>  <td>" + numbers_in_table[ indexer + 1] + "</td> <td>" + numbers_in_table[ indexer + 2] + "</td> <td> " +numbers_in_table[ indexer + 3] + "</td> </tr>";
                        }
                        else {
                                table.innerHTML += "<tr style='background-color:rgb(247,247,247)'> <td> " + numbers_in_table[ indexer] + " </td>  <td>" + numbers_in_table[ indexer + 1] + "</td> <td>" + numbers_in_table[ indexer + 2] + "</td> <td> " +numbers_in_table[ indexer + 3] + "</td> </tr>";
                        }
                               
                }

                table.title = "full";

        }
        else if ( !action && table.title == "full" ) {

                table.innerHTML = "<tr> <th>Decimal</th> <th>Binary</th> <th>Octadecimal</th> <th> Hexadecimal </th> </tr>";
                table.title = "empty";
        }

}

function setselector( element_count, set_name ) {
        var indexer;
        var elements = document.getElementById( "elements_to_select" );
        var elements_string = "";

        elements_string = "Select number of elements from set " + set_name + ": <select style='background-color=rgb(224,231,255)' id='number_to_pick' name=" + set_name + ">";

        for ( indexer = 1; indexer <= element_count; indexer++ ) {
                elements_string += "<option value=" + indexer + ">" + indexer + "</option>";
        }
        elements_string += "</select>";
        elements.innerHTML = elements_string;
}


function change_button_state( value, buttons_to_change ) {
        var indexer;
        var state;

        if ( value == "1" ) {
                state = false;
        }
        else {
                state = true;
        }

        for ( indexer = 0; indexer < buttons_to_change.length; indexer++ ) {
                document.getElementById( buttons_to_change[ indexer ] ).disabled = state; 
        }
}

function do_the_math() {
        var combinations = document.getElementById( "combination" ).checked;
        var permutations = document.getElementById( "permutation" ).checked;
        var replacements;
        var number_to_pick = document.getElementById( "number_to_pick" ).value;
        var which_set = document.getElementById( "number_to_pick" ).name;
        var set_A = ["1", "2", "3", "4"];
        var set_B = ["a", "b", "c", "d", "e"];
        var set_C = ["!", '"', "#", "$", "%", "&"];
        var set_name = [];

        if ( which_set == "A" ) {
                set_name = set_A;
        }
        else if ( which_set == "B" ) {
                set_name = set_B;
        }
        else if ( which_set == "C" ) {
                set_name = set_C;
        }

        if ( document.getElementById( "replacement" ).checked ) {
                replacements = true;
        }
        else if ( document.getElementById( "no_replacement" ).checked ) { 
                replacements = false;
        }

        if ( combinations ) {
                do_combinations( set_name, number_to_pick );
        }
        else if ( permutations ) {
                do_permutations( set_name, number_to_pick, replacements );
        }
        else {
                console.log( "Something went wrong. Nothing to calculate" );
        }
}

function do_combinations( set_name, sample_size ) {
        var indexer, indexer_2, indexer_3;
        var result = [];
        var answer = "";
        var number_of_combinations = factorial( set_name.length ) / ( factorial( sample_size ) * factorial( set_name.length - sample_size ) );

        document.getElementById( "results" ).innerHTML = "Number of combinations of length " + sample_size + " is " + number_of_combinations + "<br>";
        
        if ( set_name.length == sample_size ) {
                for ( indexer = 0; indexer < sample_size; indexer++ ) {
                        document.getElementById( "results" ).innerHTML += set_name[ indexer ];
                }
               return 1;
        }

        result = combinations( set_name, sample_size );
        
        for ( indexer = 0; indexer < number_of_combinations; indexer++ ) {
                for ( indexer_2 = 0; indexer_2 < sample_size; indexer_2++ ) {
                        document.getElementById( "results" ).innerHTML += result[ indexer ][ sample_size - 1 - indexer_2 ];
                }
                document.getElementById( "results" ).innerHTML += " ";
        }
}

function combinations( set_name, sample_size ) {

        var result_set = [];
        var result = [];

        for ( var indexer = 0; indexer < Math.pow( 2, set_name.length ); indexer++ ) {

                result = [];
                var index = set_name.length;

                do {
                        if ( ( indexer & ( 1 << index ) ) != 0 ) {
                                result.push( set_name[ index ] );
                        }

                  console.log( "index is " + (indexer & ( 1 << index )) );
                } while ( index-- );

                if ( result.length == sample_size ) {
                        result_set.push( result );
                }
        }
        return result_set;
}


function do_permutations( set_name, sample_size, replacements ) {
        var indexer, indexer_2 = 0;
        var number_of_combinations = factorial( set_name.length ) / ( factorial( sample_size ) * factorial( set_name.length - sample_size ) );
        
        if ( replacements ) {
                document.getElementById( "results" ).innerHTML = "Number of permutations of length " + sample_size + " with replacement is " + Math.pow( set_name.length, sample_size ) + "<br>";
                var test_result = permutation_replacement( set_name, sample_size );
                
                if ( sample_size == 1 ) {
                        for ( indexer = 0; indexer < set_name.length; indexer++ ) {
                                document.getElementById( "results" ).innerHTML += set_name[ indexer ] + " ";
                        }
                }
                else {
                        for ( indexer = 0; indexer < Math.pow( set_name.length, sample_size ); indexer++ ) {
                              var temporary_string = test_result[ indexer ].toString();
                              var temp_str2 = temporary_string.replace( /,/g, '' );
                              document.getElementById( "results" ).innerHTML += temp_str2 + " ";
                }
                        document.getElementById( "results" ).innerHTML += " ";
                }
        }

        else {
                document.getElementById( "results" ).innerHTML = "Number of permutations of length (withouth replacement) " + sample_size + " is " + factorial( set_name.length ) / ( factorial( set_name.length - sample_size ) ) + "<br>";
                var result_temp = combinations( set_name, sample_size );

                for ( indexer = 0; indexer < number_of_combinations; indexer++ ) {
                        var result = [];
                        result = permutate_noreplacement( result_temp[ indexer ] );
                        
                        for ( indexer_2 = 0; indexer_2 < result.length; indexer_2++ ) {
                                
                                for ( var indexer_3 = 0; indexer_3 < sample_size; indexer_3++ ) {
                                        document.getElementById( "results" ).innerHTML += result[ indexer_2 ][ sample_size - 1 - indexer_3 ];
                                }
                        
                                document.getElementById( "results" ).innerHTML += "  ";
                        }
                }


        }
    
}

function permutate_noreplacement( set_name ) {
        
        var temp_arr = [];
        var indexer, indexer_2;

        if (set_name.length < 2) {
                return set_name;
        }

                    for ( indexer  = 0; indexer < set_name.length; indexer++) {
                            var temp_arr2  = set_name.splice( indexer, 1);
                            var temp_arr3 = permutate_noreplacement( set_name );
                        for ( indexer_2 = 0; indexer_2 < temp_arr3.length; indexer_2++) {
                                temp_arr.push( [ temp_arr2 ].concat( temp_arr3[ indexer_2 ] ) );
                        }

                         set_name.splice( indexer, 0, temp_arr2[0] );
                        } 
                return temp_arr;
}


function permutation_replacement( set_name, sample_size ) {
        var tempstring = "";
        var permutation_result = [];

        for ( var indexer_1 = 0; indexer_1 < set_name.length; indexer_1++ ) {
        var result = [];
        result.push( set_name[ indexer_1 ] );

        for ( var indexer_2 = 0; indexer_2 < set_name.length && sample_size >= 2; indexer_2++ ) {
                
                if ( sample_size > 2 && result.length < 2 ) {
                        result.push( set_name[ indexer_2 ] );
                }
                else if ( sample_size == 2 && result.length < 2 ){
                        result.push( set_name[ indexer_2 ] );
                        temp_string = result.toString();
                        permutation_result.push( temp_string);
                        result.pop();
                }
                else {
                        result.splice( 1, 1, set_name[ indexer_2 ] );
                }
                for ( var indexer_3 =0; indexer_3 < set_name.length && sample_size >= 3; indexer_3++ ) {
                
                            if ( sample_size > 3  && result.length < 3 ) {
                                 result.push( set_name[ indexer_3 ] );
                            }
                            else  if ( sample_size == 3 && result.length < 3 ) {
                                 result.push( set_name[ indexer_3 ] );
                                 temp_string = result.toString();
                                 permutation_result.push( temp_string);
                                 result.pop();
                            }
                            else {
                                 result.splice( 2, 1, set_name[ indexer_3 ] );
                            }
                        
                        for ( var indexer_4 = 0; indexer_4 < set_name.length && sample_size >= 4; indexer_4++ ) {
                                 if ( sample_size > 4  && result.length < 4 ) {
                                      result.push( set_name[ indexer_4 ] );
                                 }
                                 else if ( sample_size == 4 && result.length < 4 ) {
                                      result.push( set_name[ indexer_4 ] );
                                      temp_string = result.toString();
                                      permutation_result.push( temp_string);
                                      result.pop();
                                 }
                                 else {
                                      result.splice( 3, 1, set_name[ indexer_4 ] );
                                 }

                                for ( var indexer_5 = 0; indexer_5 < set_name.length && sample_size >= 5; indexer_5++ ) {
                                         if ( sample_size > 5  && result.length < 5 ) {
                                                 result.push( set_name[ indexer_5 ] );
                                         }       
                                         else  if ( sample_size == 5 && result.length < 5 ) {
                                                 result.push( set_name[ indexer_5 ] );
                                                 temp_string = result.toString();
                                                 permutation_result.push( temp_string);
                                                 result.pop();
                                        }
                                        else {
                                                 result.splice( 4, 1, set_name[ indexer_5 ] );
                                        }

                                        for ( var indexer_6 = 0; indexer_6 < set_name.length && sample_size >= 6; indexer_6++ ) {
                                                          
                                                result.push( set_name[ indexer_6 ] );
                                                     
                                                temp_string = result.toString();
                                                permutation_result.push( temp_string);
                                                result.pop();
                                        }
                                }
                        }
                }
        }
}


return permutation_result;
}

function factorial( integer_number ) {
        if ( integer_number < 1 ) {
                return 1;
        }
        else {
                return ( integer_number * factorial( integer_number - 1 ) );
        }
}
