import React from 'react';

const LeftBar = props => {
    console.log('left props: ', props)


    // const handleSelectChanges = e => {
    //     const valueSelected = e.target.value;
    //     setSquare({ ...square, [e.target.name]: valueSelected });
    //     console.log('Square color: ', e.target.name, valueSelected, square);
    //   };




    return (
        <div>
            {/* <div className='lefty' >More Options</div> */}
            <div className='active' >
                <div className='color'>
                    <select
                        id='color'
                        name='color'
                        onChange={props.handleSelectChanges}
                        value={props.color}
                    >
                        <option value='#05F2F2' >blue</option>
                        <option value='rgb(216, 22, 54)' >pink</option>
                        <option value='#3BFF45' >green</option>
                        <option value='#D94F30' >orange</option>
                    </select>
                </div>

                <div className='speed'>
                    <select
                        id='speed'
                        name='speed'
                        onChange={props.handleChange}
                        value={props.speed}
                    >
                        <option value='1000' >Slow</option>
                        <option value='500' >Medium</option>
                        <option value='100' >Fast</option>
                        <option value='25' >Ultra Fast</option>
                    </select>
                </div>

            </div>
        </div>

    )
};



export default LeftBar;