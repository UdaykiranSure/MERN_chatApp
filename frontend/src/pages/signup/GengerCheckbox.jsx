const GengerCheckbox = ({onCheckboxChange, selectedGender}) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label  className={`label gap-2 cursor-pointer  ${selectedGender==='male'?"Selected":""}`}>
            <span className="label-text">male</span>
            <input type="checkbox" className='checkbox border-slate-900'
            checked = {selectedGender==="male"}
            onChange={() =>{onCheckboxChange("male")}}
            />  
        </label>
      </div>
      <div className="form-control">
        <label  className={`label gap-2 cursor-pointer ${selectedGender==='female'?"Selected":""}`}>
            <span className="label-text">female</span>
            <input  type="checkbox" className='checkbox border-slate-900'
            checked = {selectedGender==="female"}
            onChange={()=>{onCheckboxChange("female")}}
            />
        </label>
      </div>
    </div>
  )
}

export default GengerCheckbox
