class ICanHazRootz {

        constructor( second_dgr_coef, first_dgr_coef, constant_coef ) {
                this.snd_dgr_coef = second_dgr_coef;
                this.fst_dgr_coef = first_dgr_coef;
                this.cnst_coef = constant_coef;

                this.to_outside_root = this.getSquaresOut( this.primeComposition( Math.abs( Math.pow( this.fst_dgr_coef, 2 ) - 4 * this.snd_dgr_coef * this.cnst_coef ) ) );
                this.inside_root =  Math.abs( Math.pow( this.fst_dgr_coef, 2 ) - 4 * this.snd_dgr_coef * this.cnst_coef ) / this.to_outside_root;
        }
        
        generatePrimes( integer_number ) {
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

        primeComposition( integer_number ) {
                let square_int = Number.parseInt( Math.sqrt( integer_number ) );
                let prime_list = this.generatePrimes( square_int );
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

        greatestCommonDivisor( first_number, second_number ) {
                let temp_array1 = this.primeComposition( first_number );
                let temp_array2 = this.primeComposition( second_number );
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
                } while ( temp_array1.length && temp_array2.length );

                return greatest_common;
        }

        getSquaresOut( prime_composition_array ) {
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
}

class RealRoots extends ICanHazRootz {
        constructor(  second_dgr_coef, first_dgr_coef, constant_coef ) {
                super(  second_dgr_coef, first_dgr_coef, constant_coef );
                
                this.single_root = false;
                this.solved = false;
                this.discriminant = Math.pow( this.fst_dgr_coef, 2 ) - 4 * this.snd_dgr_coef * this.cnst_coef;
                this.first_solution = "";
                this.second_solution = "";

                if ( this.fst_dgr_coef == 0 ) {
                        if ( constant_coef == 0 ) {
                                this.single_root = true;
                                this.solution = "0";
                                this.solved = true;
                        }
                }

                if ( this.discriminant == 0 ) {
                        this.single_root = true;
                        let gcd_fst_2snd = this.greatestCommonDivisor( Math.abs( this.fst_dgr_coef), 2 * Math.abs( this.snd_dgr_coef ) );
                        let nominator = this.fst_dgr_coef / gcd_fst_2snd;
                        let denominator = this.snd_dgr_coef / gcd_fst_2snd;

                        if ( nominator % denominator == 0 ) {
                                this.solution = nominator / denominator;
                        }
                        else {
                                let sign = ( Math.sign( nominator ) * Math.sign( denominator ) == -1 ) ? "-" : "";
                                this.solution = sign + "{" + Math.abs( nominator ) + "\\over " + Math.abs( denominator ) + "}";
                        }
                        this.solved = true;
                }

                if ( this.cnst_coef == 0 && !this.single_root ) {
                        this.first_solution = "0";
                        if ( this.fst_dgr_coef % this.snd_dgr_coef == 0 ) {
                                this.second_solution += (-1) * this.fst_dgr_coef / this.snd_dgr_coef;
                        }
                        else {
                               let gcd_fst_2snd = this.greatestCommonDivisor( Math.abs( this.fst_dgr_coef), Math.abs( this.snd_dgr_coef ) );
                               let sign = ( Math.sign( this.fst_dgr_coef ) * Math.sign( this.snd_dgr_coef ) * ( -1 ) == -1 ) ? "-" : "";
                               this.second_solution = sign + "{" + Math.abs( this.fst_dgr_coef ) / gcd_fst_2snd + "\\over " + Math.abs( this.snd_dgr_coef ) / gcd_fst_2snd + "}";
                        }
                        this.solved = true;
                }
                 
        }

        getRoots() {

                if ( this.solved ) {
                        return;
                }

                if ( this.inside_root == 1 ) {
                        let gcd_first_nom_dem = this.greatestCommonDivisor( Math.abs( (-1) * this.fst_dgr_coef + Math.sqrt( this.to_outside_root ) ) , 2 * Math.abs( this.snd_dgr_coef ) );
                        let gcd_second_nom_dem = this.greatestCommonDivisor( Math.abs( (-1) * this.fst_dgr_coef - Math.sqrt( this.to_outside_root )), 2 * Math.abs( this.snd_dgr_coef ) );
                        let first_nominator = ( (-1) * this.fst_dgr_coef + Math.sqrt( this.to_outside_root ) )/ gcd_first_nom_dem;
                        let second_nominator = ( (-1) * this.fst_dgr_coef - Math.sqrt( this.to_outside_root ) ) / gcd_second_nom_dem;
                        let denominator_first = 2 * this.snd_dgr_coef / gcd_first_nom_dem;
                        let denominator_second = 2 * this.snd_dgr_coef / gcd_second_nom_dem;
                        let first_sign = ( Math.sign( first_nominator ) * Math.sign( denominator_first ) == -1 ) ? "-" : "";
                        let second_sign = ( Math.sign( second_nominator ) * Math.sign( denominator_second ) == -1 ) ? "-" : "";
                         

                        if ( Math.abs( denominator_first ) == 1 ) {
                               this.first_solution = first_sign + Math.abs( first_nominator );
                        }
                        else {
                               this.first_solution = first_sign + "{" + Math.abs( first_nominator ) + "\\over " + Math.abs( denominator_first ) + "}";
                        }

                        if ( Math.abs( denominator_second ) == 1 ) {
                               this.second_solution = second_sign + Math.abs( second_nominator );
                        }
                        else {
                               this.second_solution = second_sign + "{" + Math.abs( second_nominator ) + "\\over " + Math.abs( denominator_second ) + "}";
                        }
                        
                        return;
                }

                let outside_sqrt = Math.sqrt( this.to_outside_root );
                let gcd_out_root_fst_dgr = this.greatestCommonDivisor( Math.abs( this.fst_dgr_coef ), outside_sqrt );
                let gcd_top_bottom = ( this.fst_dgr_coef == 0 ) ? this.greatestCommonDivisor( outside_sqrt, 2 * Math.abs( this.snd_dgr_coef ) ) : this.greatestCommonDivisor( gcd_out_root_fst_dgr, 2 * Math.abs( this.snd_dgr_coef ) );
                let denominator = Math.abs( 2 * this.snd_dgr_coef ) / gcd_top_bottom;
                let root_multiplier = outside_sqrt / gcd_top_bottom;
                let fst_dgr_multip = ( this.fst_dgr_coef == 0 ) ? 0 : Math.abs( this.fst_dgr_coef ) / gcd_top_bottom;
                let sign = ( Math.sign( (-1) * this.fst_dgr_coef ) * Math.sign( this.snd_dgr_coef ) == -1 ) ? "-" : "";

                if ( root_multiplier == 1 ) {
                        if ( denominator == 1 ) {
                                this.first_solution = ( fst_dgr_multip == 0 ) ?  "\\sqrt{" + this.inside_root + "}" : sign + fst_dgr_multip + " + \\sqrt{" + this.inside_root + "}";
                                this.second_solution = ( fst_dgr_multip ==  0 ) ?  "-\\sqrt{" + this.inside_root + "}" : sign + fst_dgr_multip + " - \\sqrt{" + this.inside_root + "}";

                        }
                        else {
                                let ans_string_first = ( fst_dgr_multip == 0 ) ?  "{ \\sqrt{" + this.inside_root + "}" : sign + "{" + fst_dgr_multip + " + \\sqrt{" + this.inside_root + "}";
                                let ans_string_second = ( fst_dgr_multip == 0 ) ?  "-{ \\sqrt{" + this.inside_root + "}" : sign + "{" + fst_dgr_multip + " - \\sqrt{" + this.inside_root + "}";
 
 
                                this.first_solution =  ans_string_first + "\\over " + denominator + "}";
                                this.second_solution =  ans_string_second + "\\over " + denominator + "}";
                        }

                        return;
                }
                
                if ( denominator == 1 ) {
                        let ans_string_first = ( fst_dgr_multip == 0 ) ? root_multiplier + " + " : sign + fst_dgr_multip + " + " + root_multiplier;
                        let ans_string_second = ( fst_dgr_multip == 0 ) ? root_multiplier + " - " : sign + fst_dgr_multip + " - " + root_multiplier; 
                        this.first_solution =  ans_string_first + "\\sqrt{" + this.inside_root + "}";
                        this.second_solution = ans_string_second + "\\sqrt{" + this.inside_root + "}";
                }
                else {
                        let ans_string_first = ( fst_dgr_multip == 0 ) ? "{" + root_multiplier : sign + "{" + fst_dgr_multip + " + " + root_multiplier;
                        let ans_string_second = ( fst_dgr_multip == 0 ) ? "-{" + root_multiplier : sign + "{" + fst_dgr_multip + " - " + root_multiplier;    
                        this.first_solution = ans_string_first + "\\sqrt{" + this.inside_root + "} \\over " + denominator + "}";
                        this.second_solution = ans_string_second + "\\sqrt{" + this.inside_root + "} \\over " + denominator + "}";
                }
        }
}

class ComplexRoots extends ICanHazRootz {
        constructor(  second_dgr_coef, first_dgr_coef, constant_coef ) {
                super(  second_dgr_coef, first_dgr_coef, constant_coef );
        
                this.single_root = false;
                this.solved = false;
                this.first_solution = "";
                this.second_solution = "";
                this.real_part = "";
                this.complex_part = "";

                if ( this.fst_dgr_coef != 0 ) {
                        let gcd_fst_2snd = this.greatestCommonDivisor( Math.abs( this.fst_dgr_coef ), 2 * Math.abs( this.snd_dgr_coef ));
                        let nominator = this.fst_dgr_coef / gcd_fst_2snd;
                        let denominator = 2 * this.snd_dgr_coef / gcd_fst_2snd;
                        let sign = ( Math.sign( (-1) * nominator ) * Math.sign( denominator ) == -1 ) ? "-" : "";

                        if ( Math.abs( denominator ) == 1 ) {
                                this.real_part = sign + Math.abs( nominator );
                        }
                        else {
                                this.real_part = sign + "{" + Math.abs( nominator ) + " \\over " + Math.abs( denominator ) + "}";
                        }
                }
        }

        getRoots() {

                let outside_sqrt = Math.sqrt( this.to_outside_root );
                let gcd_out_sqrt_snd = this.greatestCommonDivisor( outside_sqrt, 2 * Math.abs( this.snd_dgr_coef ) );
                let denominator = 2 * Math.abs( this.snd_dgr_coef ) / gcd_out_sqrt_snd;
                let nominator = outside_sqrt / gcd_out_sqrt_snd;

                if ( denominator == 1 ) {
                        if ( this.inside_root == 1 ) {
                                this.complex_part = ( outside_sqrt == 1 ) ? "i" : ( nominator == 1 ) ? "i" : nominator + "i";
                        }
                        else {
                                this.complex_part = ( nominator == 1 ) ? " \\sqrt{" + this.inside_root + "}i" : nominator + " \\sqrt{" + this.inside_root + "}i";
                        }

                        this.solved = true;
                }

                if ( nominator == 1 && !this.solved ) {
                        if ( this.inside_root == 1 ) {
                                this.complex_part = "{ 1 " +  "\\over " + denominator + "}i";
                        }
                        else {
                                this.complex_part = "{ \\sqrt{" + this.inside_root + "}\\over " + denominator + "}i";
                        }

                        this.solved = true;
                }

                if ( !this.solved ) {
                        if ( this.inside_root == 1 ) {
                                this.complex_part = "{" + nominator + "\\over " + denominator + "}i";
                        }
                        else {
                                this.complex_part = "{" + nominator + "\\sqrt{" + this.inside_root + "} \\over " + denominator + "}i";
                        }

                        this.solved = true;
                }
                                
                this.first_solution = ( this.real_part.length == 0 ) ? this.complex_part : this.real_part + "+ " + this.complex_part;
                this.second_solution = ( this.real_part.length == 0 ) ? "-" + this.complex_part : this.real_part + "-" + this.complex_part;

        } 
}

function getroots() {
// If the user gives all integer coefficients we will give him exact answer, otherwise he will get in most cases approximate answer.
        var second_dgr_coef = Number( document.getElementById( "second_dgr" ).value );
        var first_dgr_coef = Number( document.getElementById( "first_dgr" ).value );
        var constant_coef = Number( document.getElementById( "constant_dgr" ).value );
        var solution_field = document.getElementById( "solution" );
        var discriminant = first_dgr_coef * first_dgr_coef - ( 4 * second_dgr_coef * constant_coef );
        var discriminant_root; 
        var complex = false;
        var roots = [];
        var we_have_integers = false;
        
        if ( second_dgr_coef == 0 ) {
                solution_field.innerHTML = "Coefficient a cannot be 0!";
                return 1;
        }
        if ( isNaN( second_dgr_coef ) || isNaN( first_dgr_coef ) || isNaN( constant_coef ) ) {
                solution_field.innerHTML = "Please use numbers only!";
                return 1;
        }

        if ( Number.isInteger( second_dgr_coef ) && Number.isInteger( first_dgr_coef ) && Number.isInteger( constant_coef ) ) {
                we_have_integers = true;
        }
       
        if ( discriminant < 0 ) {
                complex = true;
                
                if ( !we_have_integers ) {
                       discriminant_root = Math.sqrt( Math.abs( discriminant ) );
                }       
        }       
        else {
               if ( !we_have_integers ) {
                       discriminant_root = Math.sqrt( discriminant );
               }      
        }
// Lets first deal with the case when user inputs decimal numbers.
        if ( complex && !we_have_integers ) {
                roots.push( ( - first_dgr_coef ) / ( 2 * second_dgr_coef ) );
                roots.push( discriminant_root / ( 2 * second_dgr_coef ) );
                let real_part_first = ( roots[0] != 0 ) ? roots[0] + " + ": "" ;
                let real_part_second = ( roots[0] != 0 ) ? roots[0] : "" ;
                solution_field.innerHTML = "$$ x = \\begin{cases} &" + real_part_first + Math.abs( roots[1] ) + "i \\"+"\\ \\ &" + real_part_second + " - " + Math.abs( roots[1] ) + "i \\end{cases} $$";
                return;
        }
        else if ( !we_have_integers ) {
                roots.push( (( -first_dgr_coef ) + discriminant_root ) / ( 2 * second_dgr_coef ) );
                roots.push( (( -first_dgr_coef ) - discriminant_root ) / ( 2 * second_dgr_coef ) );
                       
                if ( roots[0] != roots[1] ) {
                        solution_field.innerHTML = "$$ x = \\begin{cases} &" + roots[0] + "\\" + "\\ &" + roots[1] + "\\end{cases} $$";
                }
                else {
                        solution_field.innerHTML  = "\\(x = " + roots[0] + "\\)";
                }
                
                return;
        }
// If we have complex roots use ComplexRoots otherwise RealRoots
        var Polynom = ( !complex ) ? new RealRoots( second_dgr_coef, first_dgr_coef, constant_coef ) : new ComplexRoots( second_dgr_coef, first_dgr_coef, constant_coef );

        Polynom.getRoots();

        if ( Polynom.single_root ) {
                solution_field.innerHTML = "$$ x = " + Polynom.solution + "$$";
        }
        else {
                solution_field.innerHTML = "$$ x = \\begin{cases} &" + Polynom.first_solution + "\\" + "\\ & " + Polynom.second_solution + "\\end{cases} $$";
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
