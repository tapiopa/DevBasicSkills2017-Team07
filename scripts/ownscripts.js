function getroots() {

        var second_dgr_coef = document.getElementById( "second_dgr" ).value;
        var first_dgr_coef = document.getElementById( "first_dgr" ).value;
        var constant_coef = document.getElementById( "constant_dgr" ).value;
        var solution_field = document.getElementById( "solution" );

        console.log( "Second degree = " + second_dgr_coef + "\n First degree = " + first_dgr_coef + "\n Constant = " + constant_coef);
        
        var determinant = first_dgr_coef * first_dgr_coef - ( 4 * second_dgr_coef * constant_coef );
        var determinant_root; 
        var complex = false;
        var roots = [];

        if ( determinant < 0 ) {
                
                complex = true;
                determinant_root = Math.sqrt( Math.abs ( determinant ) );
       }
       else {
               determinant_root = Math.sqrt( determinant );
      
       }


       if ( complex ) {

               roots.push( ( - first_dgr_coef ) / ( 2 * second_dgr_coef ) );
               roots.push( determinant_root / ( 2 * first_dgr_coef ) );

               solution_field.innerHTML = "$$ x = \\begin{cases} &" + roots[0] + " + " + Math.abs( roots[1] ) + "i \\"+"\\ \\ &" + roots[0] + " - " + Math.abs( roots[1] ) + "i \\end{cases} $$";
               console.log( "Solution field = " + solution_field.innerHTML );
       }
       else {
               roots.push( (( -first_dgr_coef ) + determinant_root ) / ( 2 * second_dgr_coef ) ); 
               roots.push( (( -first_dgr_coef ) - determinant_root ) / ( 2 * second_dgr_coef ) );
               
               if ( roots[0] != roots[1] ) {
                        solution_field.innerHTML = "$$ x = \\begin{cases} &" + roots[0] + "\\" + "\\ &" + roots[1] + "\\end{cases} $$";
               }
               else {
                       solution_field.innerHTML  = "\\(x = " + roots[0] + "\\)";
               }
               console.log( "Solution field = " + solution_field.innerHTML );
       } 

}

function numbersystable( action ) {
        var indexer;
        var numbers_in_table = [];
        var table = document.getElementById( "number_table" );
        console.log( "Table values = " + table.title );

        if ( action && table.title == "empty" ) {
                
                for ( indexer = 0; indexer <= 50; indexer++ ) {
                           
                        numbers_in_table.push( indexer.toString() );
                        numbers_in_table.push( indexer.toString(2) );
                        numbers_in_table.push( indexer.toString(8) );
                        numbers_in_table.push( indexer.toString(16) );
                }

                for ( indexer = 0; indexer < numbers_in_table.length; indexer += 4 ) {

                        table.innerHTML += "<tr> <td> " + numbers_in_table[ indexer] + " </td>  <td>" + numbers_in_table[ indexer + 1] + "</td> <td>" + numbers_in_table[ indexer + 2] + "</td> <td> " +numbers_in_table[ indexer + 3] + "</td> </tr>";
                }

                console.log( " InnerHTML = " + table.innerHTML );
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

        elements_string = "Select number of elements from set " + set_name + "<select id='number_to_pick' name=" + set_name + ">";

        for ( indexer = 1; indexer <= element_count; indexer++ ) {
                elements_string += "<option value=" + indexer + ">" + indexer + "</option>";
        }
        console.log( "Elements string = " + elements_string );
        elements_string += "</select>";
        console.log( "Elements again = " + elements_string );
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
        console.log( " Combs  = " + combinations );
        console.log( " Perms = " + permutations );
        console.log( " Replacements = " + replacements );
        console.log( " How many elements = " + number_to_pick );
        console.log( " Which set we're working on: " + which_set );
}

function do_combinations( set_name, sample_size ) {
        var indexer, indexer_2, indexer_3;
        var result = [];
        var answer = "";
        var number_of_combinations = factorial( set_name.length ) / ( factorial( sample_size ) * factorial( set_name.length - sample_size ) );

        console.log(" Set length " + set_name.length );

        console.log( "We're doing combinations!" );
        console.log( "Working on " + set_name );
        document.getElementById( "results" ).innerHTML = "Number of combinations of length " + sample_size + " is " + number_of_combinations + "<br>";
        console.log( "Factorial of sample size = " + factorial( sample_size ));
        
        if ( set_name.length == sample_size ) {
                for ( indexer = 0; indexer < sample_size; indexer++ ) {
                        document.getElementById( "results" ).innerHTML += set_name[ indexer ];
                }
               return 1;
        }

        result = combinations( set_name, sample_size );
        
        for ( indexer = 0; indexer < number_of_combinations; indexer++ ) {
                console.log( "Result[" + indexer + "]" + result[ indexer ][0] );
                for ( indexer_2 = 0; indexer_2 < sample_size; indexer_2++ ) {
                        document.getElementById( "results" ).innerHTML += result[ indexer ][ sample_size - 1 - indexer_2 ];
                }
                document.getElementById( "results" ).innerHTML += " ";
        }

        console.log("Back to do_combinations " + results );

       // document.getElementById( "results" ).innerHTML += result.toString();   

    


}

function combinations( set_name, sample_size ) {

        console.log( " We're here!" );
        var result_set = [];
        var result = [];

        for ( var indexer = 0; indexer < Math.pow( 2, set_name.length ); indexer++ ) {

                result = [];
                var index = set_name.length;

                do {
                        if ( ( indexer & ( 1 << index ) ) != 0 ) {
                                result.push( set_name[ index ] );
                        }


                } while ( index-- );

                if ( result.length == sample_size ) {
                        result_set.push( result );
                }
        }
        console.log( "Result set is " + result_set );
        return result_set;
}


function do_permutations( set_name, sample_size, replacements ) {
        console.log( "We're doing permutations!" );
        var indexer, indexer_2 = 0;
        console.log( "Working on " + set_name );
        var number_of_combinations = factorial( set_name.length ) / ( factorial( sample_size ) * factorial( set_name.length - sample_size ) );
        
        if ( replacements ) {
                document.getElementById( "results" ).innerHTML = "Number of permutations of length " + sample_size + " with replacement is " + Math.pow( set_name.length, sample_size ) + "<br>";
                var test_result = permutation_replacement( set_name, sample_size );
                
                for ( indexer = 0; indexer < Math.pow( set_name.length, sample_size ); indexer++ ) {
                              var temporary_string = test_result[ indexer ].toString();
                              var temp_str2 = temporary_string.replace( /,/g, '' );
                              document.getElementById( "results" ).innerHTML += temp_str2 + " ";
                              console.log( " permutation_results[" + indexer + "]"  + test_result[ indexer ].toString() );
                }
                document.getElementById( "results" ).innerHTML += " ";
        }

        else {
                document.getElementById( "results" ).innerHTML = "Number of permutations of length (withouth replacement) " + sample_size + " is " + factorial( set_name.length ) / ( factorial( set_name.length - sample_size ) ) + "<br>";
                var result_temp = combinations( set_name, sample_size );

                for ( indexer = 0; indexer < number_of_combinations; indexer++ ) {
                        var result = [];
                        result = permutate_noreplacement( result_temp[ indexer ] );
                        console.log( " Result array is  " + result );
                        
                        for ( indexer_2 = 0; indexer_2 < result.length; indexer_2++ ) {
                                
                                for ( var indexer_3 = 0; indexer_3 < sample_size; indexer_3++ ) {
                                        document.getElementById( "results" ).innerHTML += result[ indexer_2 ][ sample_size - 1 - indexer_3 ];
                                }
                        
                                document.getElementById( "results" ).innerHTML += "  ";
                        }
                }


        }
        
        console.log( "Factorial of sample size = " + factorial( sample_size ));
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
        console.log( " result is " + result );

        for ( var indexer_2 = 0; indexer_2 < set_name.length && sample_size >= 2; indexer_2++ ) {
                
                if ( sample_size > 2 && result.length < 2 ) {
                        result.push( set_name[ indexer_2 ] );
                        console.log("At the level 2 " + result );
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
                                 console.log( "level3 result before pop " + result );
                                 result.pop();
                                 console.log( "level3 result = " + result );
                            }
                            else {
                                 result.splice( 2, 1, set_name[ indexer_3 ] );
                            }
                        
                        for ( var indexer_4 = 0; indexer_4 < set_name.length && sample_size >= 4; indexer_4++ ) {
                                 console.log( "We shouldn't be here" ); 
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
                                                          
                                                result.push( set_name[ indexer_2 ] );
                                                     
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
