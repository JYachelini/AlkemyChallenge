import { characterService } from '../character.service'
import { describe, test, expect } from '@jest/globals'
import db from '../../models'

describe('Characters', () => {
	test('GET All', async () => {
		const result = await characterService.list({})

		expect(result).toBeInstanceOf(Array)
	})

	test('GET', async () => {
		const result = await characterService.get(1)

		expect(result).toBeInstanceOf(db.Character)
	})

	test('Create Character', async () => {})
})
