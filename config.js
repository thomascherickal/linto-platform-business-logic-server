/*
 * Copyright (c) 2017 Linagora.
 *
 * This file is part of Business-Logic-Server
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

const debug = require('debug')('linto-red:config')
const dotenv = require('dotenv')
const path = require('path');
const fs = require('fs')

function noop() { }

function ifHasNotThrow(element, error) {
	if (!element) throw error
	return element
}
function ifHas(element, defaultValue) {
	if (!element) return defaultValue
	return element
}

function configureDefaults() {
	try {
		dotenv.config()
		const envdefault = dotenv.parse(fs.readFileSync('.envdefault'))

		// Node environment
		process.env.NODE_ENV = ifHas(process.env.NODE_ENV, envdefault.NODE_ENV)

		//Server RED properties
		process.env.HTTP_PORT_RED = ifHas(process.env.HTTP_PORT_RED, envdefault.HTTP_PORT_RED)
		process.env.RED_UI_PATH = ifHas(process.env.RED_UI_PATH, envdefault.RED_UI_PATH)
		process.env.NODES_RED_LINTO_SKILLS_PATH = ifHas(process.env.NODES_RED_LINTO_SKILLS_PATH, envdefault.NODES_RED_LINTO_SKILLS_PATH)

		//Linto properties
		process.env.DEFAULT_LANGUAGE = ifHas(process.env.DEFAULT_LANGUAGE, envdefault.DEFAULT_LANGUAGE)
	} catch (e) {
		console.error(debug.namespace, e)
		process.exit(1)
	}
}
module.exports = configureDefaults()
