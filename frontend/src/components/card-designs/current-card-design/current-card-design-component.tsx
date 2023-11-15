import './current-card-design-component.css';

function CurrentCardDesignComponent({cardDesign}: { cardDesign: string }) {
    return (
        <div id={"current-card-design-container"}>
            <h1 id={"current-card-design-component-tittle"}>Diseño actual</h1>
            <div id={"current-card-design-cards-container"}>
                <div id={"current-card-design-cards-container-1"}>
                    {['P2', 'P3', 'P4', 'P5', 'P6', 'P7'].map((c) => {
                        return (
                            <img key={c} alt={"Error"}
                                 className={"card-designs-img-card"}
                                 src={'/src/assets/card-designs/' + cardDesign + '/' + c + '.png'}
                            />)
                    })}
                </div>
                <div id={"current-card-design-cards-container-2"}>
                    {['P8', 'P9', 'P10', 'P11', 'P12', 'P13'].map((c) => {
                        return (
                            <img key={c} alt={"Error"}
                                 className={"card-designs-img-card"}
                                 src={'/src/assets/card-designs/' + cardDesign + '/' + c + '.png'}
                            />)
                    })}
                </div>
                <div id={"current-card-design-cards-container-extra"}>
                    <img alt={"Error"} className={"card-designs-img-card"}
                         src={'/src/assets/card-designs/' + cardDesign + '/P1.png'}/>
                </div>
            </div>
        </div>
    )
}

export default CurrentCardDesignComponent;