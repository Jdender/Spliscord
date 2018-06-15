import { Piece, PieceOptions } from 'klasa';

type PieceConstructor = new (...args: any[]) => Piece;

export default <O extends PieceOptions>(opts: O) =>
    <T extends PieceConstructor>(Klass: T) => {

        return class extends Klass {

            constructor(...args: any[]) {
                super(args[0], args[1], args[2], args[3], opts);
            }
        };
    };
