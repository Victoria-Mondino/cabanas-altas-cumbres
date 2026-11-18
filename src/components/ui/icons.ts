import {
  Bathtub,
  Bed,
  Binoculars,
  Campfire,
  Car,
  Coffee,
  CookingPot,
  Drop,
  Fire,
  Mountains,
  PawPrint,
  Star,
  Tree,
  WifiHigh,
  type IconProps,
} from '@phosphor-icons/react'
import type { ComponentType } from 'react'

const ICONS: Record<string, ComponentType<IconProps>> = {
  Bathtub,
  Bed,
  Binoculars,
  Campfire,
  Car,
  Coffee,
  CookingPot,
  Drop,
  Fire,
  Mountains,
  PawPrint,
  Star,
  Tree,
  WifiHigh,
}

export const iconFor = (name: string) => ICONS[name] ?? Star
