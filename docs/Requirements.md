# Requerimentos

Esse documento possui como objetivo apresentar os requerimentos funcionais e não-funcionais da aplicação utilizada.

## Requerimentos Funcionais

| Identificador | Nome do Requerimento | Descrição 
| - | - | -
| RF-CARD-1 | Criação do Cartões   | O sistema deve permitir a criação de um cartão com perguntas na frente e as respostas no verso e tags
| RF-CARD-2 | Visualização do Cartão | O sistema deve permitir acessar o cartão criado e verificar tanto a pergunta quanto a resposta
| RF-CARD-3 | Edição do Cartão | O sistema deve permitir a edição das informações do cartão
| RF-CARD-4 | Deleção do Cartão | O sistema deve permitir a deleção de um cartão
| RF-DECK-1 | Criação de Grupos de Cartões | O sistema deve permitir a criação de um grupo de cartão com as informações: tópico do grupo, descrição, tags
| RF-DECK-2 | Adicionar Cartões ao Grupo | O sistema deve permitir a adição de cartões a um determinado grupo
| RF-DECK-3 | Remoção de Cartões do Grupo | O sistema deve permitir a remoção de cartões de um determinado grupo ao qual eles pertencem
| RF-DECK-4 | Edição do Grupo | O sistema deve permitir a edição de todas informações do grupo de cartões
| RF-DECK-5 | Visualização do Grupo | O sistema deve permitir o acesso às informações do grupo de cartões: tópico, descrição, número de cartões e cartões pertencentes
| RF-DECK-6 | Deleção do Grupo | O sistema deve permitir deletar grupos de cartão sem que os cartões sejam deletados
| RF-SM-1 | SuperMemo - Revisão | O sistema deve organizar os cartões de forma que eles sejam revisados espaçadamente de acordo com o nível de informação retida
| RF-SM-2 | SuperMemo - Avaliação | O sistema deve permitir que eu avalie a facilidade com a qual eu revisei um cartão

### Notas
1. Verificar a funcionalidade de edição de campos do Anki*
2. Verificar a funcionalidade de criação de templates*

## Requerimentos Não Funcionais

| Identificador| Nome do Requrimento | Descrição
| - | - | -
| RNF-ARQ-1 | Arquitetura do Sistema | O sistema deve ser desenvolvido com base nos princípios da Arquitetura Limpa
| RNF-TEC-1 | Tecnologia | O sistema deve ser desenvolvido utilizando TypeScript e NodeJS

_\* Essas funcionalidades podem ser interessantes para adicionar complexidade à aplicação e expor ainda mais os benefícios da Arquitetura Limpa_