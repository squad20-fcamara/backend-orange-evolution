import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Content from 'App/Models/Content'

export default class ContentsController {
  public async index({ response }: HttpContextContract) {

    try {
      const contents = await Content.all();

      return response.status(200).send(contents)
    }catch(error){
      console.log(error)
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const { title, type, duration, link, author, category } = request.all()

    try {

      const newContent = await Content.create({
        title,
        type,
        duration,
        link,
        author,
        category
      })

      return response.status(201).send(newContent)
    } catch (error) {
      console.log(error)
    }
  }

  public async show({params, response}: HttpContextContract) {
    const { id } = params

    try {
      const content = await Content.findOrFail(id)

      return response.status(200).send(content)
    } catch (error) {
      console.log(error)
    }
  }

  public async update({ request, response, params}: HttpContextContract) {
    const { id } = params

    const newContent = request.only(['title', 'type', 'duration', 'link', 'author', 'category'])
    // const { title, type, duration, link, author, category } = request.all()

    try {
      const content = await Content.findOrFail(id)

      content.merge(newContent)

      await content.save()

      return response.status(200).send(content)
    } catch (error) {
      console.log(error)
    }

  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params

    try {
      const content = await Content.findOrFail(id)

      await content.delete()

      return response.status(200).send({ message: `Content ${id} deleted` })
    } catch (error) {
      console.log(error)
    }
  }
}