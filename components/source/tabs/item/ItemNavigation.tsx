import { CharacterAlteration, Item, Source } from '@prisma/client'
import React from 'react'

interface ItemNavigationProps {
  item: Item & {
    source: Source;
    characterAlterations: CharacterAlteration[];
  }
}

function ItemNavigation({ item }: ItemNavigationProps) {
  return (
    <div>ItemNavigation</div>
  )
}

export default ItemNavigation