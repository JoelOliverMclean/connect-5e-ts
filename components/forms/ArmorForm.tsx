"use client"
import { ArmorType, Source } from '@prisma/client'
import React, { useState } from 'react'
import { BaseForm, BaseFormData } from './BaseForm'
import { apiPost } from '@/utils/apiUtils'
import { redirect } from 'next/navigation'
import { capitalise } from '@/utils/textUtils'
import { Check } from 'lucide-react'

function ArmorForm({
  source
} : {
  source: Source
}) {
  const [error, setError] = useState<string | undefined | null>(null)
  const [selectedArmorType, setSelectedArmorType] = useState<ArmorType | string | null | undefined>(ArmorType.LIGHT)
  const [addModifier, setAddModifier] = useState<boolean>(false)
  const [stealthDisadvantage, setStealthDisadvantage] = useState<string>("false")

  const submitArmorForm = (data: BaseFormData) => {
    console.log(data)
    apiPost("/api/armor/new", data).then(({
      response,
      data
    }) => {
      if (response.status === 200) {
        setError(null)
        redirect(`/source/${source.slug}/armor/${data.slug}`)
      } else {
        setError(data.error)
      }
    })
  }

  const armorTypeOptions = Object.keys(ArmorType).map((type, index) => (
    <option key={index} value={type}>{capitalise(type.toLowerCase())}</option>
  ))

  return (
    <BaseForm onSubmitData={submitArmorForm} error={error}>
      <input hidden type="text" name='sourceId' value={source.id} />
      <input type="text" name='name' placeholder='Name of armor' />
      <select name='type' onChange={(e) => {
        setSelectedArmorType(e.target.value)
        }}>
        {armorTypeOptions}
      </select>
      {selectedArmorType === ArmorType.SHIELD ? (
        <input type="number" name='bonusAC' placeholder='Bonus AC' />
        ) : (
        <input type="number" name='baseAC' placeholder='Base AC' />
        )}
      <div className='flex gap-4 items-center ps-2' onClick={() => setAddModifier(!addModifier)}>
        <p>Add Modifier</p>
        <div className='w-[24px] h-[24px] rounded-md border-1 flex items-center justify-center'>
          {addModifier && <Check size={20} />}
        </div>
      </div>
      {addModifier && 
        <select name='modifier'>
          <option value={"dexterity"}>Dexterity</option>
        </select>
      }
      <textarea name="description" placeholder='Description of armor' />
      <div className='flex gap-4 items-center ps-2' onClick={() => setStealthDisadvantage(stealthDisadvantage === "true" ? "false" : "true")}>
        <p>Stealth disadvantage</p>
        <div className='w-[24px] h-[24px] rounded-md border-1 flex items-center justify-center'>
          {stealthDisadvantage === "true" && <Check size={20} />}
        </div>
        <input hidden type="text" name='stealthDisadvantage' value={stealthDisadvantage} />
      </div>
    </BaseForm>
  )
}

export default ArmorForm