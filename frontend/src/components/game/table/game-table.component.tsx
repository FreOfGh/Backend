import './game-table.component.css';

export default function GameTableComponent() {
    return (
        <div id={"game-table-component-container"}>
            <div id={"game-table-component-match"}>
                <div id={"game-table-component-match-desk"}></div>
                <div id={"game-table-component-match-discarded"}></div>
            </div>
            <div id={"game-table-component-cards"}>

            </div>
        </div>
    )
}