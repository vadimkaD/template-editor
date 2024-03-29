Офлайн задание - Message Template Editor

Необходимо разработать редактор шаблонов сообщений и виджет предпросмотра сообщений.

Условный скриншот редактора
https://monosnap.com/file/ZmfoYTNzlOLH6L69TL6JEEXGzV2aGa



Виджет предпросмотра шаблона сообщений:

Все переменные заполнены

2) Заполнены все переменные, кроме position 


3) Заполнены только firstname и lastname



Требования к виджету редактирования шаблона сообщений:

На вход виджет получает: 

arrVarNames [required] - массив имен переменных

template [optional] - шаблон сообщения.

callbackSave - асинхронная функция сохранения шаблона


Работа с переменными:


На основании массива переменных должен быть создан подвиджет из кнопок-имен переменных, обернутых в фигурные скобки. Например, “firstname” -> “{firstname}”.
Клик по такой переменной должен добавлять ее в последнее место, где был курсор ввода или в начало шаблона, если курсор еще не указывался.


Кнопка [IF-THEN-ELSE]

В верхней части виджета где-либо должна быть добавлена кнопка [IF-THEN-ELSE]

Нажатие на кнопку [IF-THEN-ELSE] должно разбить текущий блок редактирования шаблона сообщения на два блока (текст также разделяется на две части по последней позиции курсора). Между этими блоками добавляется подвиджет [IF-THEN-ELSE].

Подвиджет [IF-THEN-ELSE]

Состоит из 3х блоков: IF, THEN и ELSE.

В каждом из этих блоков пользователь может писать текст, добавлять переменные по нажатию на кнопки добавления переменных, а также добавлять вложенные виджеты [IF-THEN-ELSE].
Исполняется THEN ветка, если после вычисления IF получилась не пустая строка, в противном случае выполняется ELSE ветка.

Где-либо внутри блока должна быть предусмотрена кнопка DELETE, нажатие на которую отменяет добавление данного виджета, склеивая блоки над и под ним в один. 
Кнопка Close закрывает виджет - реализация диалога “сохранить изменения?” не обязательна.

Кнопка Preview - открывает поверх виджет предпросмотра шаблона.

Кнопка Save - вызывает callbackSave с актуальным шаблоном.


Формат шаблона сообщения должен быть разработан в рамках решения данной задачи. Он должен удовлетворять следующим критериям:

Сериализуется и десериализуется в строку;

Отсутствие side effects - какой бы текст, кроме имён переменных, не ввел пользователь, он должен обрабатываться строго как текст.
Если пользователь что-либо вводит в фигурных скобках отличное от заранее указанной переменной, то это должно восприниматься, как обычный текст.
Особых требований к стилям нет. Иконки к кнопкам добавлять необязательно.


Требования к виджету предпросмотра шаблона сообщений:
На вход виджет получает: 
arrVarNames [required] - массив имен переменных
template [required] - шаблон сообщения.
Виджет состоит из трех частей
Не редактируемая область просмотра сгенерированного сообщения;
Поля ввода значений переменных
Кнопка close
Сгенерированное сообщение должно меняться на лету при вводе значений переменных.
Визуально всегда должно быть видно, какая переменная какое значение имеет.
Требований к стилистике и дизайну нет. На скриншотах выше представлен один из возможных вариантов.
Генератор сообщения на шаблоне должен быть выделен в отдельную функцию.

Требования к функции-генератору сообщений
На вход функция получает: 
template [required] - шаблон сообщения
values [required] - значения переменных (объект вида {name : value}). В объекте могут присутствовать, как лишние пары name & value - должны игнорироваться, так и отсутствовать необходимые - должны интерпретироваться, как пустые значения.
На выходе сгенерированная строка.
У функции не должно быть side effects. Не должно быть такого, что какой-либо пользовательский текст интерпретировался, как оператор.
Функция должна иметь 100% покрытие тестами.

Требования к проекту в целом
Проект должен быть представлен в виде HTML странички с кнопкой “Message Editor”.
При нажатии на кнопку “Message Editor” открывается виджет Message Template Editor с переменными:
	arrVarNames = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : [‘firstname’, ‘lastname’, ‘company’, ‘position’];
	template = localStorage.template  ? JSON.parse(localStorage.template) : null;
	callbackSave - функция, которая записывает шаблон в localStorage.template
Задача реализуется на React и TypeScript без использования UI-фреймворков. Использование бесплатных сторонних библиотек возможно, но нежелательно.
Для настройки окружения используйте create-react-app последней версии.

Обязательные требования к решению
Полная функциональность в соответствии с изложенными требованиями
Отсутствие багов и потенциальных уязвимостей
Отсутствие зависаний интерфейса (например, при установке курсора в поле ввода и зажимании клавиши с буквой на клавиатуре).                 

Рекомендации к выполнению задания
Не нужно делать поля ввода в виде div с contenteditable = true.
Использовать изоляцию стилей (предпочтительно css-модули)
Желательно использовать React hooks
Желательно использование анимаций
Наличие комментариев к коду, решение должно быть написано так, чтобы потом его мог легко понять и поддерживать другой разработчик.

Расчет чистого времени на реализацию задания

Виджет редактирования шаблона - 12 часов
Функция-генератор сообщений - 4 часов
Тесты для функции генератора - 4 часа
Виджет просмотра шаблона - 4 часа
Прочее 1 час

Итого 25 часов.
