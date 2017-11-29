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

               solution_field.innerHTML = "\\( x = " + roots[0] + " + " + Math.abs( roots[1] ) + "i\\) and \\(" + roots[0] + " - " + Math.abs( roots[1] ) + "i\\)";
               console.log( "Solution field = " + solution_field.innerHTML );
       }
       else {
               roots.push( (( -first_dgr_coef ) + determinant_root ) / ( 2 * second_dgr_coef ) ); 
               roots.push( (( -first_dgr_coef ) - determinant_root ) / ( 2 * second_dgr_coef ) );
               
               if ( roots[0] != roots[1] ) {
                        solution_field.innerHTML = "\\(x = " + roots[0] + "\\) and \\(" + roots[1] + "\\)";
               }
               else {
                       solution_field.innerHTML  = "\\(x = " + roots[0] + "\\)";
               }
               console.log( "Solution field = " + solution_field.innerHTML );
       } 

}





