function numbersystable() {
        var indexer;
        var number_table = [];

        for ( indexer = 0; indexer <= 50; indexer++ ) {
                
                number_table.push( indexer.toString() );
                number_table.push( indexer.toString(2) );
                number_table.push( indexer.toString(8) );
                number_table.push( indexer.toString(16) );
        }

        return number_table;
}


