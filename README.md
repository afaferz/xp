## Um blog simples para a XP Inc.
### Tecnologias utilizadas

#### Setup da aplicação
 - VueJS - v3.2.33
 - Webpack - v5.72.0
 - Webpack Dev Server - v4.8.1
 - Typescript - v4.6.4
 -  Jest - v27.0.0
 - Vue Utils - v2.0.0-rc.18 (para Vue 3)
 
#### Comandos de aplicação

Para instalar as dependências

    npm install
Para rodar o servidor local

    npm start
   Para rodar os testes

    npm test
   Para rodar o build do projeto

    npm run build

Caso queira visualizar a página na web click [aqui](https://xp-drab.vercel.app/)
   
   Por padrão o servidor rodará na porta **3000** mas caso queira rodar em outra porta altere o valor no campo `devServer` em `webpack.config.ts`
   
     export  default  function (_env: string, argv: { mode: string }) {
        // outras configurações omitidas
         devServer: {
            static: {
              directory:  path.join(__dirname, 'public'),
            },
            historyApiFallback:  true,
            hot:  'only',
            compress:  true,
            port:  <porta-desejada-aqui>,
         },
        // outras configurações omitidas
      };



#### Considerações sobre o projeto
##### Funcionalidades ainda não implementadas

 - Existe no projeto uma configura de PIPELINE para CI/CD de deploy com o github-actions e o github pages, porém, até o momento não consegui configurar a baseUrl do projeto buildado em produção para conseguir prover o arquivo correto gerado no `build` para o site.
 - Existe dentro da cobertura de testes existem algumas `branchs`que não estão cobertas 100% (no caso são `ref`s do Vue 3) cujos não consegui testar ainda por não achar muito sobre esse tipo de teste.
 - Existe nos testes de componentes a tipagem do elemento `wrapper` como `VueWrapper<any>` pois ainda não descobri como usar o tipo do próprio componente testado como o tipo do elemento `VueWrapper`. Embora não seja tipado, o componente é tipado em seu próprio nível, porém seria interessante usar seu tipo na montagem mockada do Vue Utils

##### Considerações sobre o projeto em si
A escolha das stacks foi motivada pela vontade de aprender mais sobre cada uma delas. Já havia implementado previamente um bundle com `webpack` na versão para Vanilla Javascript, mas ao descobrir que agora há suporte para Typescript para a ferramenta decidi ir atrás de aprender como implementá-lo. 

A escolha de VueJS para a realização da prova foi pela familiaridade e gosto pessoal; a escolha da versão 3 se deu pela possibilidade nativa de utilização de Composition API e pela maior facilidade e legibilidade que ela traz. Entretanto, alguns componentes do Vue 3 como Teleport e Suspense ainda são experimentais e para eles criei um teste mockando a utilização na página `Home.spec.ts` para não deixar de usar a funcionalidade mas também não deixar a aplicação sem cobertura de testes.

A escolha de SASS como pré-compilador CSS se deu também pela familiaridade com ele e mesmo por se tratar de uma aplicação pequena ele se mostra bem performático que não vi motivo em utilizar CSS puro. Ao mesmo tempo, como estive configurando o webpack em TS quis adicionar o SASS para poder entender melhor como seu loader funcionaria nesse cenário.

#### Conclusão
No mais, pude aprender mais sobre o webpack, Typescript e o próprio VueJS desenvolvendo essa pequena aplicação, onde cada erro foi uma outra oportunidade de aprender sobre como funciona tanto um bundle de Web Component quanto o próprio bundle do Vue, e foi realmente surpreso o resultado de como eles se integram bem :D
